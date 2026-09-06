import { pineconeIndex } from "../config/pinecone.ts";
import { generateEmbedding } from "./embedding.service.ts";

interface RetrievedChunk {
    documentId: string;
    chunkIndex: number;
    content: string;
    score: number;
}

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
    
    return (results.matches ?? []).map((match) => ({
        documentId: String(match.metadata?.documentId),
        chunkIndex: Number(match.metadata?.chunkIndex),
        content: String(match.metadata?.content),
        score: match.score ?? 0,
    }));
}