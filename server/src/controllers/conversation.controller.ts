import { Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.ts";
import type { AuthRequest } from "../middlewares/auth.middleware.ts";
import ApiResponse from "../utils/ApiResponse.ts";
import { createConversation, GetConversations, GetMessages } from "../services/conversation.service.ts";
import { conversationParamsSchema } from "../validators/conversation.validator.ts";

export const createConversationController = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const conversation = await createConversation({
            userId: req.user!.id,
        });

        return res.status(201).json(
            new ApiResponse(
                201,
                conversation,
                "Conversation created successfully"
            )
        );
    }
);

export const GetConversationsController = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const conversations = await GetConversations({
            userId: req.user!.id,
        })

        return res.status(200).json(
            new ApiResponse(
                200,
                conversations,
                "Conversations fetched successfully"
            )
        )
    }
)

export const GetMessagesController = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const { id } = conversationParamsSchema.parse(req.params);

        const messages = await GetMessages({
            conversationId: id,
            userId: req.user!.id,
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                messages,
                "Messages fetched successfully"
            )
        )
    }
)