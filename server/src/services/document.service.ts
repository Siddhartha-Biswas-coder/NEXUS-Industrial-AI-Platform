import DocumentModel from "../models/document.model.ts";
import { splitTextIntoChunks, saveChunks } from "./chunk.service.ts";
import { extractPdfText } from "./pdf.service.ts";
import { indexChunks } from "./vector.service.ts";

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

    // Step 2: Extract text from the uploaded PDF
    const parsed = await extractPdfText(file.path)

    // Step 3: Store extracted data
    document.extractedText = parsed.text;
    document.pageCount = parsed.pages;
    document.processedAt = new Date();
    document.status = "processing";

    await document.save();

    // Step 4: Split text into chunks
    const chunks = await splitTextIntoChunks(parsed.text);

    // Step 5: Save chunks to MongoDB
    await saveChunks(document.id, userId, chunks);

    await indexChunks(document.id, userId, chunks)

    // Step 6: Mark document as indexed
    document.status = "indexed";

    await document.save()

    return document;

}