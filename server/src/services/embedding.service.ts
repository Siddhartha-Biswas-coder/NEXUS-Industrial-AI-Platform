import config from "../config/config.ts";

const EMBEDDING_SERVICE_URL = `http://${config.EBEDDINGS_IP_ADDRESS}:${config.EBEDDINGS_PORT}/embed`;

interface EmbeddingResponse {
    dimensions: number;
    embeddings: number[][];
}

export const generateEmbeddings = async (
    texts: string[]
): Promise<number[][]> => {
    const response = await fetch(EMBEDDING_SERVICE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ texts })
    })

    if (!response.ok) {
        throw new Error("Embedding service failed.")
    }

    const data = (await response.json()) as EmbeddingResponse;

    return data.embeddings;
}

export const generateEmbedding = async (
    text: string
): Promise<number[]> => {
    const [embedding] = await generateEmbeddings([text]);
    return embedding
}