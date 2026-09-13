import { Metadata } from "pdf-parse";
import { pineconeIndex } from "../config/pinecone.ts";
import { generateEmbeddings } from "./embedding.service.ts";

interface ChunkData {
    chunkIndex: number;
    content: string;
    pageNumber: number;
}

export const indexChunks = async (
    documentId: string,
    documentTitle: string,
    ownerId: string,
    chunks: ChunkData[]
) => {
    const embeddings = await generateEmbeddings(
        chunks.map((chunk) => chunk.content)
    )

    const vectors = chunks.map((chunk, index) => ({
        id: `${documentId}-${chunk.chunkIndex}`,
        values: embeddings[index],
        metadata: {
            documentId,
            documentTitle,
            ownerId,
            chunkIndex: chunk.chunkIndex,
            content: chunk.content,
            pageNumber: chunk.pageNumber,
        }
    }))

    console.log(`Generating embeddings for ${chunks.length} chunks...`);

    await pineconeIndex.upsert({
        records: vectors,
    });

    console.log(`Indexed ${vectors.length} vectors into Pinecone.`);
}