import { Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.ts";
import type { AuthRequest } from "../middlewares/auth.middleware.ts";
import ApiError from "../errors/ApiError.ts";
import ApiResponse from "../utils/ApiResponse.ts";
import { uploadDocumentService } from "../services/document.service.ts";
import { sanitizeDocument } from "../utils/sanitizeDocument.ts";

export const uploadDocumentController = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        if (!req.file) {
            throw new ApiError(400, "PDF file is required");
        }

        const title = req.body.title?.trim() || req.file.originalname;

        const document = await uploadDocumentService({
            title,
            file: req.file,
            userId: req.user!.id,
        });

        return res.status(201).json(
            new ApiResponse(
                201,
                { document: sanitizeDocument(document) },
                "Document uploaded successfully"
            )
        );
    }
);