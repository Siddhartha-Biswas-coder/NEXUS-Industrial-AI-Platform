import { Response } from "express"
import asyncHandler from "../middlewares/asyncHandler"
import type { AuthRequest } from "../middlewares/auth.middleware"
import { chatSchema } from "../validators/chat.validator"
import { askQuestionStream } from "../services/chat.service"
import MessageModel from "../models/message.model"

export const streamChatController = asyncHandler(
    async (req: AuthRequest, res: Response) => {

        const { conversationId, question } = chatSchema.parse(req.body);

        res.setHeader("Content-type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        res.flushHeaders();

        //Stream started
        res.write(`data: ${JSON.stringify({ type: "start", conversationId })}\n\n`);

        const { stream, conversation, sources } = await askQuestionStream({
            conversationId,
            question,
            userId: req.user!.id
        })

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

        await MessageModel.create({
            chat: conversationId,
            role: "assistant",
            content: fullResponse.trim(),
            sources
        })

        conversation.lastMessageAt = new Date()
        await conversation.save()

        // Send updated conversation metadata
        res.write(
            `data: ${JSON.stringify({
                type: "conversation",
                conversation: {
                    _id: conversation.id,
                    title: conversation.title,
                    lastMessageAt: conversation.lastMessageAt,
                    createdAt: conversation.createdAt,
                },
            })}\n\n`
        );

        // Send citations
        res.write(
            `data: ${JSON.stringify({
                type: "sources",
                sources,
            })}\n\n`
        );

        //Stream finished
        res.write(`data: ${JSON.stringify({ type: "done" })}\n\n`)

        res.end()
    }
)