import { Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.ts";
import type { AuthRequest } from "../middlewares/auth.middleware.ts";
import ApiResponse from "../utils/ApiResponse.ts";
import { chatSchema } from "../validators/chat.validator.ts";
import { askQuestion } from "../services/chat.service.ts";

export const chatController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { question } = chatSchema.parse(req.body);

    const result = await askQuestion(question, req.user!.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "Answer generated successfully"
      )
    );
  }
);