import ConversationModel from "../models/conversation.model.ts";
import DocumentModel from "../models/document.model.ts";
import MessageModel from "../models/message.model.ts";

interface CreateConversationData {
    userId: string;
    title?: string;
    activeDocuments?: string[];
}

interface GetConversationsData {
    userId: string;
}

interface GetMessagesData {
    conversationId: string;
    userId: string;
}

interface UpdateConversationData {
    conversationId: string;
    userId: string;
    title: string;
}

interface UpdateActiveDocumentsData {
    conversationId: string;
    userId: string;
    activeDocuments: string[];
}

interface DeleteConversationData {
    conversationId: string;
    userId: string;
}

export const createConversation = async ({
    userId,
    title,
    activeDocuments,
}: CreateConversationData) => {
    const uniqueDocumentIds = [...new Set(activeDocuments ?? [])];

    if (uniqueDocumentIds.length > 0) {
        const ownedDocuments = await DocumentModel.find({
            _id: { $in: uniqueDocumentIds },
            owner: userId,
        }).select("_id");

        if (ownedDocuments.length !== uniqueDocumentIds.length) {
            throw new Error(
                "One or more selected documents were not found or are not accessible.",
            )
        }
    }

    return ConversationModel.create({
        owner: userId,
        title: title ?? "New Conversation",
        activeDocuments: uniqueDocumentIds as any[],
    });
};

export const getConversations = async ({
    userId
}: GetConversationsData) => {
    return ConversationModel.find({
        owner: userId
    }).sort({ lastMessageAt: -1 })
        .select("_id title activeDocuments lastMessageAt createdAt")
}

export const getMessages = async ({
    conversationId,
    userId,
}: GetMessagesData) => {
    const conversation = await ConversationModel.findOne({
        _id: conversationId,
        owner: userId,
    })

    if (!conversation) {
        throw new Error("Conversation not found")
    }

    return MessageModel.find({
        chat: conversationId,
    }).sort({ createdAt: 1 })
        .select("role content sources responseType createdAt")
}

export const updateConversationTitle = async ({
    conversationId,
    userId,
    title,
}: UpdateConversationData) => {
    const conversation = await ConversationModel.findOneAndUpdate(
        {
            _id: conversationId,
            owner: userId
        },
        {
            title,
        },
        {
            new: true
        }
    )

    if (!conversation) {
        throw new Error("Conversation not found")
    }

    return conversation
}

export const deleteConversation = async ({
    conversationId,
    userId
}: DeleteConversationData) => {
    const conversation = await ConversationModel.findOne({
        _id: conversationId,
        owner: userId,
    })

    if (!conversation) {
        return null;
    }

    await MessageModel.deleteMany({
        chat: conversationId
    })

    await conversation.deleteOne()

    return conversation
}

export const updateConversationActiveDocuments = async ({
    conversationId,
    userId,
    activeDocuments
}: UpdateActiveDocumentsData) => {

    const conversation = await ConversationModel.findOne({
        _id: conversationId,
        owner: userId,
    })

    if (!conversation) {
        throw new Error("Conversation not found")
    }

    const uniqueDocumentIds = [...new Set(activeDocuments)];

    if (uniqueDocumentIds.length > 0) {
        const ownerDocuments = await DocumentModel.find({
            _id: { $in: uniqueDocumentIds },
            owner: userId,
        }).select("_id")

        if (ownerDocuments.length !== uniqueDocumentIds.length) {
            throw new Error(
                "One or more selected documents were not found or are not accessible.",
            )
        }
    }

    conversation.activeDocuments = uniqueDocumentIds as any[];
    await conversation.save();

    await conversation.populate("activeDocuments", "_id title");

    return conversation;

}

