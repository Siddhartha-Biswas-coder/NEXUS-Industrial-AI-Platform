import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import type { Document } from "@langchain/core/documents";
import ChunkModel from "../models/chunk.model.ts";

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
});


export const splitTextIntoChunks = async (text: string) => {
    const docs = await splitter.createDocuments([text]);

    return docs.map((doc: Document, index: number) => ({
        chunkIndex: index,
        content: doc.pageContent,
        characterCount: doc.pageContent.length,
        pageNumber: Math.floor(index) + 1,
    }))
}

export const saveChunks = async (
    documentId: string,
    ownerId: string,
    chunks: Awaited<ReturnType<typeof splitTextIntoChunks>>
) => {
    const chunkDocs = chunks.map(chunk => ({
        document: documentId,
        owner: ownerId,
        ...chunk
    }))

    return await ChunkModel.insertMany(chunkDocs);
}