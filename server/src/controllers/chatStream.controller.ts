
import { Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.ts";
import type { AuthRequest } from "../middlewares/auth.middleware.ts";
import { chatSchema } from "../validators/chat.validator.ts";
import { askQuestionStream } from "../services/chat.service.ts";
import MessageModel from "../models/message.model.ts";
import ConversationModel from "../models/conversation.model.ts";

export const streamChatController = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const { conversationId, question } = chatSchema.parse(req.body);

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache, no-transform");
        res.setHeader("Connection", "keep-alive");
        res.flushHeaders();

        const abortController = new AbortController();
        let clientDisconnected = false;

        const onClose = () => {
            if (!res.writableEnded) {
                clientDisconnected = true;
                abortController.abort();
            }
        };

        res.on("close", onClose);

        const sendEvent = (data: Record<string, unknown>) => {
            if (clientDisconnected || res.destroyed || res.writableEnded) {
                return false;
            }

            res.write(`data: ${JSON.stringify(data)}\n\n`);
            return true;
        };

        try {
            sendEvent({ type: "start", conversationId });

            const {
                stream,
                conversation,
                sources,
                responseType,
            } = await askQuestionStream({
                conversationId,
                question,
                userId: req.user!.id,
                signal: abortController.signal,
            });

            let fullResponse = "";

            for await (const token of stream) {
                if (clientDisconnected || res.destroyed || res.writableEnded) {
                    break;
                }

                fullResponse += token;

                if (!sendEvent({ type: "token", content: token })) {
                    break;
                }
            }

            // Do not save a partial response as a completed answer.
            if (clientDisconnected || res.destroyed || res.writableEnded) {
                return;
            }

            await MessageModel.create({
                chat: conversationId,
                role: "assistant",
                content: fullResponse.trim(),
                sources,
                responseType,
            });

            const updatedConversation = await ConversationModel.findOneAndUpdate(
                {
                    _id: conversationId,
                    owner: req.user!.id,
                },
                {
                    $set: { lastMessageAt: new Date() },
                },
                {
                    new: true,
                },
            );

            if (!updatedConversation) {
                throw new Error("Conversation not found.");
            }

            sendEvent({
                type: "conversation",
                conversation: updatedConversation,
            });

            sendEvent({ type: "sources", sources });
            sendEvent({ type: "responseType", responseType });
            sendEvent({ type: "done" });

            res.end();
        } catch (error: unknown) {
            console.error("Error in streamChatController:", error);

            if (!clientDisconnected && !res.destroyed && !res.writableEnded) {
                sendEvent({
                    type: "error",
                    message: "Unable to complete the chat request.",
                });

                res.end();
            }
        } finally {
            res.off("close", onClose);
        }
    }
);
