import fs from "fs/promises";
import DocumentModel from "../models/document.model.ts";

interface GetDocumentFileData {
    documentId: string;
    userId: string;
}

export const getDocumentFileService = async ({
    documentId,
    userId
}: GetDocumentFileData) => {
    const document = await DocumentModel.findOne({
        _id: documentId,
        owner: userId,
    });

    if (!document) {
        throw new Error("Document not found")
    }

    await fs.access(document.filePath);

    return document
}

