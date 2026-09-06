import { llm } from "./llm/index.ts";
import { retrievedRelevantChunks } from "./retrieval.service.ts";

interface ChatResponse {
  answer: string;
  sources: {
    documentId: string;
    chunkIndex: number;
    score: number;
  }[];
}

export const askQuestion = async (
  question: string,
  userId: string
): Promise<ChatResponse> => {
  // Retrieve relevant chunks
  const matches = await retrievedRelevantChunks(question, userId);

  const context = matches
    .map((chunk) => chunk.content)
    .join("\n\n");

  const prompt = `
You are Nexus, an AI knowledge assistant.

Rules:
- Answer ONLY using the provided context.
- If the answer is not present in the context, reply:
  "I couldn't find that information in your uploaded documents."
- Keep answers clear and concise.

Context:
--------------------
${context}
--------------------

Question:
${question}
`;

  const answer = await llm.generate({ prompt });

  return {
    answer: answer.trim(),
    sources: matches.map((chunk) => ({
      documentId: chunk.documentId,
      chunkIndex: chunk.chunkIndex,
      score: chunk.score,
    })),
  };
};