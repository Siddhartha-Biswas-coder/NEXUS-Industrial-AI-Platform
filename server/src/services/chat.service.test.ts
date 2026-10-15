
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../config/config.ts", () => ({
  default: { RAG_THRESHOLD: 0.25 },
}));

vi.mock("../models/conversation.model.ts", () => ({
  default: { findOne: vi.fn() },
}));

vi.mock("../models/document.model.ts", () => ({
  default: {},
}));

vi.mock("../models/message.model.ts", () => ({
  default: { create: vi.fn() },
}));

vi.mock("./llm/index.ts", () => ({
  llm: {
    generate: vi.fn(),
    streamGenerate: vi.fn(),
  },
}));

vi.mock("./prompt.service.ts", () => ({
  buildGeneralPrompt: vi.fn(() => "general prompt"),
  buildRAGPrompt: vi.fn(() => "RAG prompt"),
  buildHybridPrompt: vi.fn(() => "hybrid prompt"),
}));

vi.mock("./retrieval.service.ts", () => ({
  retrievedRelevantChunks: vi.fn(),
}));

import ConversationModel from "../models/conversation.model.ts";
import MessageModel from "../models/message.model.ts";
import { llm } from "./llm/index.ts";
import { retrievedRelevantChunks } from "./retrieval.service.ts";
import { askQuestion, askQuestionStream } from "./chat.service.ts";

const mockedConversation = vi.mocked(ConversationModel);
const mockedMessages = vi.mocked(MessageModel);
const mockedLlm = vi.mocked(llm);
const mockedRetrieval = vi.mocked(retrievedRelevantChunks);

describe("chat conversation authorization", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects regular chat when the conversation is not owned by the user", async () => {
    mockedConversation.findOne.mockResolvedValue(null);

    await expect(
      askQuestion({
        conversationId: "conversation-a",
        question: "Hello",
        userId: "user-b",
      }),
    ).rejects.toThrow("Conversation not found.");

    expect(mockedConversation.findOne).toHaveBeenCalledWith({
      _id: "conversation-a",
      owner: "user-b",
    });
    expect(mockedMessages.create).not.toHaveBeenCalled();
    expect(mockedRetrieval).not.toHaveBeenCalled();
    expect(mockedLlm.generate).not.toHaveBeenCalled();
  });

  it("rejects streaming chat when the conversation is not owned by the user", async () => {
    mockedConversation.findOne.mockResolvedValue(null);

    await expect(
      askQuestionStream({
        conversationId: "conversation-a",
        question: "Hello",
        userId: "user-b",
      }),
    ).rejects.toThrow("Conversation not found.");

    expect(mockedConversation.findOne).toHaveBeenCalledWith({
      _id: "conversation-a",
      owner: "user-b",
    });
    expect(mockedMessages.create).not.toHaveBeenCalled();
    expect(mockedRetrieval).not.toHaveBeenCalled();
    expect(mockedLlm.streamGenerate).not.toHaveBeenCalled();
  });
});

