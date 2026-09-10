import ConversationModel from "../models/conversation.model.ts";
import MessageModel from "../models/message.model.ts";

interface CreateConversationData {
    userId: string;
}

interface GetConversationsData {
    userId: string;
}

interface GetMessagesData {
    conversationId: string;
    userId: string;
}

export const createConversation = async ({
    userId,
}: CreateConversationData) => {
    return ConversationModel.create({
        owner: userId,
        title: "New Conversation",
    });
};

export const GetConversations = async ({
    userId
}: GetConversationsData) => {
    return ConversationModel.find({
        owner: userId
    }).sort({ lastMessageAt: -1 })
        .select("_id title lastMessageAt createdAt")
}

export const GetMessages = async ({
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
        .select("role content sources createdAt")
}

