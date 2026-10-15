import { Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.ts";
import type { AuthRequest } from "../middlewares/auth.middleware.ts";
import ApiResponse from "../utils/ApiResponse.ts";
import { createConversation, deleteConversation, getConversations, getMessages, updateConversationActiveDocuments, updateConversationTitle } from "../services/conversation.service.ts";
import { conversationParamsSchema, createConversationSchema, updateConversationDocumentSchema, updateConversationSchema } from "../validators/conversation.validator.ts";

export const createConversationController = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const { title, activeDocuments } = createConversationSchema.parse(req.body)

        const conversation = await createConversation({
            userId: req.user!.id,
            title,
            activeDocuments,
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

export const getConversationsController = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const conversations = await getConversations({
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

export const getMessagesController = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const { conversationId } = conversationParamsSchema.parse(req.params);

        const messages = await getMessages({
            conversationId,
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

export const updateConversationTitleController = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const { title } = updateConversationSchema.parse(req.body)
        const { conversationId } = conversationParamsSchema.parse(req.params)

        const conversation = await updateConversationTitle({
            conversationId,
            userId: req.user!.id,
            title,
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                conversation,
                "Conversation updated successfully"
            )
        )
    }
)

export const deleteConversationController = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const { conversationId } = conversationParamsSchema.parse(req.params);

        const conversation = await deleteConversation({
            conversationId,
            userId: req.user!.id,
        })

        if (!conversation) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Conversation not found",
                ),
            );
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Conversation deleted successfully"
            )
        )
    }
)

export const updateConversationActiveDocumentsController = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const { activeDocuments } = updateConversationDocumentSchema.parse(req.body)
        const { conversationId } = conversationParamsSchema.parse(req.params)

        const conversation = await updateConversationActiveDocuments({
            conversationId,
            userId: req.user!.id,
            activeDocuments,
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                conversation,
                "Active documents updated successfully"
            )
        )
    }
)