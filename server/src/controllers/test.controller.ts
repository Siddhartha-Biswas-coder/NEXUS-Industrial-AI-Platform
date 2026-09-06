import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.ts";
import { generateEmbedding } from "../services/embedding.service.ts";

export const testEmbeddingController = asyncHandler(
  async (_req: Request, res: Response) => {
    const embedding = await generateEmbedding(
      "We care if you can debug when things break."
    );

    return res.json({
      success: true,
      dimensions: embedding.length,
      preview: embedding.slice(0, 5),
    });
  }
);