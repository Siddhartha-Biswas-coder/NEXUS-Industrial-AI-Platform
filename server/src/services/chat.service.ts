
import ConversationModel from "../models/conversation.model.ts";
import MessageModel from "../models/message.model.ts";
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

interface ChatData {
  conversationId: string;
  question: string;
  userId: string;
}


export const askQuestion = async ({
  conversationId,
  question,
  userId,
}: ChatData): Promise<ChatResponse> => {
  await MessageModel.create({
    chat: conversationId,
    role: "user",
    content: question
  })


  // Retrieve relevant chunks
  const matches = await retrievedRelevantChunks(question, userId);

  const context = matches
    .slice(0, 5)
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

  await MessageModel.create({
    chat: conversationId,
    role: "assistant",
    content: answer.trim(),
    sources: matches.map((chunk) => ({
      documentId: chunk.documentId,
      chunkIndex: chunk.chunkIndex,
      score: chunk.score
    }))
  })

  await ConversationModel.findByIdAndUpdate(
    conversationId,
    {
      lastMessageAt: new Date(),
    }
  );

  return {
    answer: answer.trim(),
    sources: matches.map((chunk) => ({
      documentId: chunk.documentId,
      chunkIndex: chunk.chunkIndex,
      score: chunk.score,
    })),
  };
};