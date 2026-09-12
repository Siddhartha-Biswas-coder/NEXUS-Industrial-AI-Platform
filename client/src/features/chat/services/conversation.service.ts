import api from "../../../shared/lib/axios";

export const createConversation = async (title?: string) => {
    const response = await api.post("/conversations", { title })
    return response.data.data
}

export const getConversations = async () => {
    const response = await api.get("/conversations")
    return response.data.data
}

export const getMessages = async (conversationId: string) => {
    const response = await api.get(`/conversations/${conversationId}/messages`)

    return response.data.data
}