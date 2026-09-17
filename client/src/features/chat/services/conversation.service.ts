import api from "../../../shared/lib/axios";

export const createConversation = async (
    title?: string,
    activeDocuments?: string[]
) => {
    const response = await api.post("/conversations", { title, activeDocuments });
    return response.data.data;
};

export const getConversations = async () => {
    const response = await api.get("/conversations")
    return response.data.data
}

export const getMessages = async (conversationId: string) => {
    const response = await api.get(`/conversations/${conversationId}/messages`)

    return response.data.data
}

export const renameConversation = async (
    conversationId: string,
    title: string
) => {
    const response = await api.patch(`/conversations/${conversationId}`, { title })

    return response.data.data
}

export const deleteConversation = async (conversationId: string) => {
    const response = await api.delete(`/conversations/${conversationId}`);
    return response.data.data
}

export const updateConversationDocuments = async (
    conversationId: string,
    activeDocuments: string[],
) => {
    const response = await api.patch(
        `/conversations/${conversationId}/active-documents`,
        {
            activeDocuments
        }
    )

    return response.data.data
}