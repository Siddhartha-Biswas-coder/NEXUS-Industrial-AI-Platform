import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import type { Document } from "@langchain/core/documents";
import ChunkModel from "../models/chunk.model.ts";

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
});

export interface PageText {
  pageNumber: number;
  text: string;
}

export interface ProcessedChunk {
  chunkIndex: number;
  content: string;
  characterCount: number;
  pageNumber: number;
}

export const splitTextIntoChunks = async (
  pageTexts: PageText[]
): Promise<ProcessedChunk[]> => {
  const chunks: ProcessedChunk[] = [];

  for (const page of pageTexts) {
    if (!page.text || page.text.trim().length === 0) continue;

    const docs = await splitter.createDocuments([page.text]);

    const baseIndex = chunks.length;
    for (let index = 0; index < docs.length; index++) {
      const doc: Document = docs[index];
      chunks.push({
        chunkIndex: baseIndex + index,
        content: doc.pageContent,
        characterCount: doc.pageContent.length,
        pageNumber: page.pageNumber,
      });
    }
  }

  return chunks;
};

export const saveChunks = async (
    documentId: string,
    ownerId: string,
    chunks: Awaited<ReturnType<typeof splitTextIntoChunks>>
) => {
    const chunkDocs = chunks.map((chunk) => ({
        document: documentId,
        owner: ownerId,
        ...chunk,
    }));

    return await ChunkModel.insertMany(chunkDocs);
};