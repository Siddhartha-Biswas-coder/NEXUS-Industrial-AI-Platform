
import config from "../config/config.ts";
import ConversationModel from "../models/conversation.model.ts";
import MessageModel from "../models/message.model.ts";
import { llm } from "./llm/index.ts";
import { buildGeneralPrompt, buildRAGPrompt } from "./prompt.service.ts";
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

  const bestScore = matches[0]?.score ?? 0;
  const useRAG = bestScore >= config.RAG_THRESHOLD

  const context = useRAG
    ? matches
      .slice(0, 5)
      .map((chunk) => chunk.content)
      .join("\n\n")
    : "";

  const prompt = useRAG
    ? `
      You are Nexus, an AI knowledge assistant.

      Rules:
      - Prioritize the provided document context.
      - If the context fully answers the question, answer from it.
      - If the context is incomplete, clearly separate document-based information from general knowledge.

      Context:
      --------------------
      ${context}
      --------------------

      Question:
      ${question}
      `
    :
    `
      You are Nexus, a helpful AI assistant.

      Answer the user's question using your general knowledge.

      Question:
      ${question}
    `;

  const answer = await llm.generate({ prompt });

  const sources = useRAG
    ? matches.map((chunk) => ({
      documentId: chunk.documentId,
      chunkIndex: chunk.chunkIndex,
      score: chunk.score
    }))
    : []

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

export const askQuestionStream = async ({
  conversationId,
  question,
  userId,
}: ChatData) => {
  const conversation = await ConversationModel.findById(conversationId);

  if (!conversation) {
    throw new Error("Conversation not found.");
  }

  await MessageModel.create({
    chat: conversationId,
    role: "user",
    content: question,
  });

  if (conversation.title === "New Conversation") {
    conversation.title =
      question.length > 40
        ? question.slice(0, 40).trim() + "..."
        : question.trim();
  }

  const matches = await retrievedRelevantChunks(question, userId);

  const bestScore = matches[0]?.score ?? 0;
  const useRAG = bestScore >= config.RAG_THRESHOLD;

  const context = useRAG
    ? matches
      .slice(0, 5)
      .map((chunk) => chunk.content)
      .join("\n\n")
    : "";

  const prompt = useRAG
    ? buildRAGPrompt({
      question,
      context
    })
    :
    buildGeneralPrompt({
      question
    })

  const sources = useRAG
    ? matches.map((chunk) => ({
      documentId: chunk.documentId,
      chunkIndex: chunk.chunkIndex,
      score: chunk.score,
    }))
    : [];

  return {
    stream: llm.streamGenerate({ prompt }),
    conversation,
    sources,
  };
};