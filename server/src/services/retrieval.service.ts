import { pineconeIndex } from "../config/pinecone.ts";
import { generateEmbedding } from "./embedding.service.ts";

interface RetrievedChunk {
    documentId: string;
    documentTitle: string;
    chunkIndex: number;
    pageNumber?: number;
    content: string;
    score: number;
}

const parseNumber = (val: unknown): number | undefined => {
    if (val === undefined || val === null || val === "") return undefined;
    const num = Number(val);
    return Number.isNaN(num) ? undefined : num;
};

export const retrievedRelevantChunks = async (question: string,
    userId: string,
    topK = 5
): Promise<RetrievedChunk[]> => {

    // Generate embedding for the user's question
    const vector = await generateEmbedding(question);

    // Search Pinecone
    const results = await pineconeIndex.query({
        vector,
        topK,
        includeMetadata: true,
        filter: {
            ownerId: userId,
        },
    }
    );

    return (results.matches ?? []).filter((match) => {
        const metadata = match.metadata;
        return (
            metadata?.documentId &&
            metadata?.documentTitle &&
            metadata?.pageNumber != null
        )
    }).map((match) => ({
        documentId: String(match.metadata?.documentId ?? ""),
        documentTitle: String(match.metadata?.documentTitle ?? ""),
        chunkIndex: parseNumber(match.metadata?.chunkIndex) ?? 0,
        pageNumber: parseNumber(match.metadata?.pageNumber),
        content: String(match.metadata?.content ?? ""),
        score: match.score ?? 0,
    }));
}