import z from "zod";

export const getDocumentParamsSchema = z.object({
    documentId: z.string().length(24),
});