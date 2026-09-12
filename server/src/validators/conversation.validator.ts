import { z } from "zod";

export const conversationParamsSchema = z.object({
    id: z.string().length(24),
});

export const createConversationSchema = z.object({
    title: z.string().trim().min(1).max(100).optional()
})