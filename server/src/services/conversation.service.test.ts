
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../models/conversation.model.ts", () => ({
  default: {
    create: vi.fn(),
    findOne: vi.fn(),
  },
}));

vi.mock("../models/document.model.ts", () => ({
  default: {
    find: vi.fn(),
  },
}));

vi.mock("../models/message.model.ts", () => ({
  default: {
    deleteMany: vi.fn(),
  },
}));

import ConversationModel from "../models/conversation.model.ts";
import DocumentModel from "../models/document.model.ts";
import MessageModel from "../models/message.model.ts";
import {
  createConversation,
  updateConversationActiveDocuments,
  deleteConversation,
} from "./conversation.service.ts";

const mockedConversationModel = vi.mocked(ConversationModel);
const mockedDocumentModel = vi.mocked(DocumentModel);
const mockedMessageModel = vi.mocked(MessageModel);

describe("conversation document ownership", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a conversation when all selected documents belong to the user", async () => {
    mockedDocumentModel.find.mockReturnValue({
      select: vi.fn().mockResolvedValue([
        { _id: "doc-a" },
        { _id: "doc-b" },
      ]),
    } as any);

    mockedConversationModel.create.mockResolvedValue({
      _id: "conversation-a",
      owner: "user-a",
      activeDocuments: ["doc-a", "doc-b"],
    } as any);

    const result = await createConversation({
      userId: "user-a",
      activeDocuments: ["doc-a", "doc-b"],
    });

    expect(result).toBeDefined();
    expect(mockedDocumentModel.find).toHaveBeenCalledWith({
      _id: { $in: ["doc-a", "doc-b"] },
      owner: "user-a",
    });
    expect(mockedConversationModel.create).toHaveBeenCalled();
  });

  it("rejects a conversation containing a document the user cannot access", async () => {
    mockedDocumentModel.find.mockReturnValue({
      select: vi.fn().mockResolvedValue([{ _id: "doc-a" }]),
    } as any);

    await expect(
      createConversation({
        userId: "user-a",
        activeDocuments: ["doc-a", "doc-b"],
      }),
    ).rejects.toThrow(
      "One or more selected documents were not found or are not accessible.",
    );

    expect(mockedConversationModel.create).not.toHaveBeenCalled();
  });

  it("creates a conversation without querying documents when none are selected", async () => {
    mockedConversationModel.create.mockResolvedValue({
      _id: "conversation-a",
      owner: "user-a",
      activeDocuments: [],
    } as any);

    await createConversation({
      userId: "user-a",
    });

    expect(mockedDocumentModel.find).not.toHaveBeenCalled();
    expect(mockedConversationModel.create).toHaveBeenCalledWith({
      owner: "user-a",
      title: "New Conversation",
      activeDocuments: [],
    });
  });

  it("rejects updating documents on a conversation the user does not own", async () => {
    mockedConversationModel.findOne.mockResolvedValue(null);

    await expect(
      updateConversationActiveDocuments({
        conversationId: "conversation-a",
        userId: "user-b",
        activeDocuments: ["doc-a"],
      }),
    ).rejects.toThrow("Conversation not found");

    expect(mockedDocumentModel.find).not.toHaveBeenCalled();
  });

  it("rejects inaccessible documents when updating a conversation", async () => {
    const conversation = {
      activeDocuments: [],
      save: vi.fn(),
      populate: vi.fn(),
    };

    mockedConversationModel.findOne.mockResolvedValue(conversation as any);

    mockedDocumentModel.find.mockReturnValue({
      select: vi.fn().mockResolvedValue([]),
    } as any);

    await expect(
      updateConversationActiveDocuments({
        conversationId: "conversation-a",
        userId: "user-a",
        activeDocuments: ["doc-a"],
      }),
    ).rejects.toThrow(
      "One or more selected documents were not found or are not accessible.",
    );

    expect(conversation.save).not.toHaveBeenCalled();
  });


  it("deletes an owned conversation and its messages", async () => {
    const conversation = {
      _id: "conversation-a",
      deleteOne: vi.fn().mockResolvedValue(undefined),
    };

    mockedConversationModel.findOne.mockResolvedValue(
      conversation as any,
    );

    mockedMessageModel.deleteMany.mockResolvedValue({
      acknowledged: true,
      deletedCount: 2,
    } as any);

    const result = await deleteConversation({
      conversationId: "conversation-a",
      userId: "user-a",
    });

    expect(mockedConversationModel.findOne).toHaveBeenCalledWith({
      _id: "conversation-a",
      owner: "user-a",
    });
    expect(mockedMessageModel.deleteMany).toHaveBeenCalledWith({
      chat: "conversation-a",
    });
    expect(conversation.deleteOne).toHaveBeenCalledOnce();
    expect(result).toBe(conversation);
  });

  it("does not delete a conversation the user does not own", async () => {
    mockedConversationModel.findOne.mockResolvedValue(null);

    const result = await deleteConversation({
      conversationId: "conversation-a",
      userId: "user-b",
    });

    expect(result).toBeNull();
    expect(mockedMessageModel.deleteMany).not.toHaveBeenCalled();
  });

  it("does not delete messages if conversation lookup fails", async () => {
    mockedConversationModel.findOne.mockRejectedValue(
      new Error("Database unavailable"),
    );

    await expect(
      deleteConversation({
        conversationId: "conversation-a",
        userId: "user-a",
      }),
    ).rejects.toThrow("Database unavailable");

    expect(mockedMessageModel.deleteMany).not.toHaveBeenCalled();
  });

});
