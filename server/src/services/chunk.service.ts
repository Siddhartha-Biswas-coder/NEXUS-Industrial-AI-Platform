import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import ChunkModel from "../models/chunk.model.ts";

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
});

interface ChunkData {
    chunkIndex: number;
    content: string;
    characterCount: number;
    pageNumber: number
}


export const splitTextIntoChunks = async (pageTexts: string[]): Promise<ChunkData[]> => {
    const chunks: ChunkData[] = [];
    let chunkIndex = 0;

    for (let page = 0; page < pageTexts.length; page++) {
        const pageChunks = await splitter.splitText(pageTexts[page]);

        for (const content of pageChunks) {
            chunks.push({
                chunkIndex: chunkIndex++,
                content,
                characterCount: content.length,
                pageNumber: page + 1,
            })
        }
    }

    return chunks;
}

export const saveChunks = async (
    documentId: string,
    ownerId: string,
    chunks: ChunkData[]
) => {
    const chunkDocs = chunks.map(chunk => ({
        document: documentId,
        owner: ownerId,
        ...chunk
    }))

    return await ChunkModel.insertMany(chunkDocs);
}