import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.ts";
import ApiResponse from "../utils/ApiResponse.ts";
import { llm } from "../services/llm/index.ts";
import { retrievedRelevantChunks } from "../services/retrieval.service.ts";
import type { AuthRequest } from "../middlewares/auth.middleware.ts";

// Test the LLM independently
export const testLLMController = asyncHandler(
  async (_req: Request, res: Response) => {
    const answer = await llm.generate({
      prompt: "Answer in exactly one sentence: What is debugging?",
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        { answer },
        "LLM is working"
      )
    );
  }
);

// Test Pinecone retrieval independently
export const testRetrievalController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const chunks = await retrievedRelevantChunks(
      "What did Aarav learn during his internship?",
      req.user!.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        chunks,
        "Retrieved relevant chunks"
      )
    );
  }
);