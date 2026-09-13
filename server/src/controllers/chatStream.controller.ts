import { Response } from "express"
import asyncHandler from "../middlewares/asyncHandler"
import type { AuthRequest } from "../middlewares/auth.middleware"
import { chatSchema } from "../validators/chat.validator"
import { askQuestionStream } from "../services/chat.service"
import MessageModel from "../models/message.model"

import ConversationModel from "../models/conversation.model"

export const streamChatController = asyncHandler(
    async (req: AuthRequest, res: Response) => {

        const { conversationId, question } = chatSchema.parse(req.body);

        res.setHeader("Content-type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        res.flushHeaders();

        //Stream started
        res.write(`data: ${JSON.stringify({ type: "start", conversationId })}\n\n`);

        try {
            const { stream, conversation, sources, responseType } = await askQuestionStream({
                conversationId,
                question,
                userId: req.user!.id
            })

            console.log("Streaming started");

            let fullResponse = "";

            for await (const token of stream) {
                fullResponse += token;

                res.write(
                    `data: ${JSON.stringify({
                        type: "token",
                        content: token,
                    })}\n\n`
                )
            }

            console.log("Stream finished");
            console.log("Saving assistant message");

            await MessageModel.create({
                chat: conversationId,
                role: "assistant",
                content: fullResponse.trim(),
                sources,
                responseType
            })

            console.log("Assistant message saved");

            conversation.lastMessageAt = new Date()
            await ConversationModel.findByIdAndUpdate(conversationId, {
                lastMessageAt: conversation.lastMessageAt,
            })

            // Send updated conversation metadata
            res.write(
                `data: ${JSON.stringify({
                    type: "conversation",
                    conversation,
                })}\n\n`
            );

            // Send citations
            res.write(
                `data: ${JSON.stringify({
                    type: "sources",
                    sources,
                })}\n\n`
            );

            res.write(
                `data: ${JSON.stringify({
                    type: "responseType",
                    responseType,
                })}\n\n`
            );

            //Stream finished
            res.write(`data: ${JSON.stringify({ type: "done" })}\n\n`)

            res.end()
        } catch (error: any) {
            console.error("Error in streamChatController:", error);
            res.write(
                `data: ${JSON.stringify({
                    type: "error",
                    message: error?.message || "Internal server error while streaming response",
                })}\n\n`
            );
            res.end();
        }
    }
)