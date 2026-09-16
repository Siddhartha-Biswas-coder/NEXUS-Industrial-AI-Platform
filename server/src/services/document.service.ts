import type { Express } from "express";
import DocumentModel from "../models/document.model.ts";
import { splitTextIntoChunks, saveChunks } from "./chunk.service.ts";
import { extractPdfText } from "./pdf.service.ts";
import { indexChunks } from "./vector.service.ts";
import fs from "fs/promises";
import ChunkModel from "../models/chunk.model.ts";

interface UploadData {
    title: string;
    file: Express.Multer.File;
    userId: string;
}

export const uploadDocumentService = async ({ title, file, userId }: UploadData) => {
    // Step 1: Save document metadata
    const document = await DocumentModel.create({
        title,
        originalName: file.originalname,
        filePath: file.path,
        fileSize: file.size,
        mimeType: file.mimetype,
        owner: userId,
        status: "uploaded"
    })
    try {

        document.status = "processing";
        await document.save();

        // Step 2: Extract text from the uploaded PDF
        const parsed = await extractPdfText(file.path)

        // Step 3: Store extracted data
        document.extractedText = parsed.text;
        document.pageCount = parsed.pages;
        document.processedAt = new Date();
        await document.save();

        // Step 4: Split text into chunks
        const chunks = await splitTextIntoChunks(parsed.pageTexts);

        const validChunks = chunks.filter(
            (chunk) => chunk.content.trim().length > 0
        )

        if (validChunks.length === 0) {
            throw new Error(
                "This PDF contains no extractable text. Please upload a searchable PDF or enable OCR."
            );
        }

        // Step 5: Save chunks to MongoDB
        await saveChunks(document.id, userId, validChunks);

        await indexChunks(document.id, document.title, userId, validChunks)

        // Step 6: Mark document as indexed
        document.status = "indexed";

        await document.save()

        return document;
    } catch (error) {
        // Delete uploaded file from disk
        await fs.unlink(file.path).catch(() => { });

        // Remove any chunks that may have been created
        await ChunkModel.deleteMany({ document: document._id });

        // Remove the document itself
        await document.deleteOne();

        throw error;
    }

}

export const getDocumentsService = async (userId: string) => {
    return await DocumentModel.find({ owner: userId }).select(
        "title originalName fileSize status createdAt processedAt pageCount"
    )
        .sort({ createdAt: -1 })
}