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

export const retrievedRelevantChunks = async (
    question: string,
    userId: string,
    activeDocuments: string[] = [],
    topK = 8
): Promise<RetrievedChunk[]> => {
    if (!activeDocuments || activeDocuments.length === 0) {
        return [];
    }

    // Generate embedding for the user's question
    const vector = await generateEmbedding(question);

    const filter = {
        ownerId: userId,
        documentId: { $in: activeDocuments },
    };

    // Search Pinecone
    const results = await pineconeIndex.query({
        vector,
        topK,
        includeMetadata: true,
        filter,
    });

    return (results.matches ?? [])
        .filter((match) => Boolean(match.metadata?.content))
        .map((match) => ({
            documentId: String(match.metadata?.documentId ?? ""),
            documentTitle: String(match.metadata?.documentTitle ?? "Document"),
            chunkIndex: parseNumber(match.metadata?.chunkIndex) ?? 0,
            pageNumber: parseNumber(match.metadata?.pageNumber),
            content: String(match.metadata?.content ?? ""),
            score: match.score ?? 0,
        }));
}