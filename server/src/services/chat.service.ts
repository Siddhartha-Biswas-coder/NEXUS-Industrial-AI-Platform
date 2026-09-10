
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
  conversation: {
    _id: string;
    title: string;
    lastMessageAt: Date;
    createdAt: Date;
  }
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
  const conversation = await ConversationModel.findById(conversationId);

  if (!conversation) {
    throw new Error("Conversation not found.");
  }

  await MessageModel.create({
    chat: conversationId,
    role: "user",
    content: question
  })

  // Rename only on the first message
  if (conversation.title === "New Conversation") {
    conversation.title =
      question.length > 40
        ? question.slice(0, 40).trim() + "..."
        : question.trim();
  }

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

  const sources = matches.map((chunk) => ({
    documentId: chunk.documentId,
    chunkIndex: chunk.chunkIndex,
    score: chunk.score
  }))

  await MessageModel.create({
    chat: conversationId,
    role: "assistant",
    content: answer.trim(),
    sources,
  })

  conversation.lastMessageAt = new Date();
  await conversation.save();

  return {
    answer: answer.trim(),
    sources,
    conversation: {
      _id: conversation.id,
      title: conversation.title,
      lastMessageAt: conversation.lastMessageAt,
      createdAt: conversation.createdAt
    }
  };
};