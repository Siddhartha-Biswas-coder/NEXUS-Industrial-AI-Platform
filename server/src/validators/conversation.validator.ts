import { z } from "zod";

export const conversationParamsSchema = z.object({
    conversationId: z.string().length(24),
});

export const createConversationSchema = z.object({
    title: z.string().trim().min(1).max(100).optional()
})

export const updateConversationSchema = z.object({
    title: z.string().trim().min(1).max(100)
})

export const updateConversationDocumentSchema = z.object({
    activeDocuments: z.array(z.string().length(24))
})