import config from "../config/config.ts";

const EMBEDDING_SERVICE_URL = `http://${config.EMBEDDINGS_IP_ADDRESS}:${config.EMBEDDINGS_PORT}/embed`;

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
        const errorText = await response.text();
        throw new Error(
            `Embedding service failed (${response.status}): ${errorText}`
        );
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