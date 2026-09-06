import type { DocumentDocument } from "../models/document.model.ts";

export const sanitizeDocument = (document: DocumentDocument) => {
    const doc = document.toObject();

    const { extractedText, ...safeDocument } = doc;

    return { ...safeDocument, extractedTextPreview: extractedText?.slice(0, 300) + "..." };
}