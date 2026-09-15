import { Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.ts";
import type { AuthRequest } from "../middlewares/auth.middleware.ts";
import { getDocumentFileService } from "../services/documentFile.service.ts";
import { getDocumentParamsSchema } from "../validators/document.validator.ts";

export const documentFileController = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const { documentId } = getDocumentParamsSchema.parse(req.params)

        const document = await getDocumentFileService({
            documentId,
            userId: req.user!.id
        })

        res.sendFile(document.filePath)
    }
)