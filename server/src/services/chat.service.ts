
import config from "../config/config.ts";
import ConversationModel from "../models/conversation.model.ts";
import DocumentModel from "../models/document.model.ts";
import MessageModel from "../models/message.model.ts";
import { llm } from "./llm/index.ts";
import { buildGeneralPrompt, buildRAGPrompt, buildHybridPrompt } from "./prompt.service.ts";
import { retrievedRelevantChunks } from "./retrieval.service.ts";

export type ResponseType = "rag" | "general" | "hybrid";

interface Source {
  documentId: string;
  chunkIndex: number;
  documentTitle?: string;
  pageNumber?: number;
  score: number;
}

interface ConversationSummary {
  _id: string;
  title: string;
  activeDocuments?: any[];
  lastMessageAt: Date;
  createdAt: Date;
}

interface ChatResponse {
  answer: string;
  responseType: ResponseType;
  sources: Source[];
  conversation: ConversationSummary;
}

interface StreamChatResponse {
  stream: AsyncGenerator<string>;
  conversation: ConversationSummary;
  sources: Source[];
  responseType: ResponseType;
}

interface ChatData {
  conversationId: string;
  question: string;
  userId: string;
  signal?: AbortSignal;
}

const getActiveDocumentIds = (activeDocs?: any[]): string[] => {
  if (!activeDocs || !Array.isArray(activeDocs)) return [];
  return activeDocs
    .map((doc) => {
      if (!doc) return null;
      if (typeof doc === "string") return doc;
      if (doc._id) return doc._id.toString();
      if (typeof doc.toString === "function") {
        const str = doc.toString();
        return str !== "[object Object]" ? str : null;
      }
      return null;
    })
    .filter((id): id is string => Boolean(id));
};

export const askQuestion = async ({
  conversationId,
  question,
  userId,
}: ChatData): Promise<ChatResponse> => {
  const conversation = await ConversationModel.findOne({
    _id: conversationId,
    owner: userId,
  });

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
  const activeDocIds = getActiveDocumentIds(conversation.activeDocuments);
  const matches = await retrievedRelevantChunks(
    question,
    userId,
    activeDocIds
  );

  const threshold = config.RAG_THRESHOLD ?? 0.25;
  const relevantChunks = matches.filter((chunk) => chunk.score >= threshold);
  const useRAG = relevantChunks.length > 0;
  const responseType: ResponseType = useRAG
    ? "rag"
    : "general";

  const context = useRAG
    ? relevantChunks
      .slice(0, 8)
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
    });

  const answer = await llm.generate({ prompt });

  const sources = useRAG
    ? relevantChunks.map((chunk) => ({
      documentId: chunk.documentId,
      documentTitle: chunk.documentTitle,
      chunkIndex: chunk.chunkIndex,
      pageNumber: chunk.pageNumber,
      score: chunk.score
    }))
    : [];

  await MessageModel.create({
    chat: conversationId,
    role: "assistant",
    content: answer.trim(),
    sources,
    responseType
  });

  conversation.lastMessageAt = new Date();
  await conversation.save();

  return {
    answer: answer.trim(),
    responseType,
    sources,
    conversation: {
      _id: conversation.id,
      title: conversation.title,
      activeDocuments: conversation.activeDocuments,
      lastMessageAt: conversation.lastMessageAt,
      createdAt: conversation.createdAt
    }
  };
};

export const askQuestionStream = async ({
  conversationId,
  question,
  userId,
  signal,
}: ChatData): Promise<StreamChatResponse> => {
  const conversation = await ConversationModel.findOne({
    _id: conversationId,
    owner: userId,
  });

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
    await conversation.save();
  }

  const activeDocIds = getActiveDocumentIds(conversation.activeDocuments);
  const matches = await retrievedRelevantChunks(
    question,
    userId,
    activeDocIds
  );

  const threshold = config.RAG_THRESHOLD ?? 0.25;
  const relevantChunks = matches.filter((chunk) => chunk.score >= threshold);
  const useRAG = relevantChunks.length > 0;
  const responseType: ResponseType = useRAG
    ? "rag"
    : "general";

  const context = useRAG
    ? relevantChunks
      .slice(0, 8)
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
    });

  const sources = useRAG
    ? relevantChunks.map((chunk) => ({
      documentId: chunk.documentId,
      documentTitle: chunk.documentTitle,
      chunkIndex: chunk.chunkIndex,
      score: chunk.score,
      pageNumber: chunk.pageNumber,
    }))
    : [];

  return {
    stream: llm.streamGenerate({ prompt, signal }),
    conversation: {
      _id: conversation.id,
      title: conversation.title,
      activeDocuments: conversation.activeDocuments,
      lastMessageAt: conversation.lastMessageAt,
      createdAt: conversation.createdAt
    },
    sources,
    responseType,
  };
};