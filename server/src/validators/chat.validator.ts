import z from "zod";

export const chatSchema = z.object({
  question: z
    .string()
    .trim()
    .min(3, "Question is too short")
    .max(1000, "Question is too long"),
});