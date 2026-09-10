import { z } from "zod";

export const conversationParamsSchema = z.object({
    id: z.string().length(24),
});