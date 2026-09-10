import api from "../../../shared/lib/axios";
import type { ChatResponse } from "../types/conversation.types";

export const askQuestion = async (
    conversationId: string,
    question: string
): Promise<ChatResponse> => {
    const response = await api.post("/chat", {
        conversationId,
        question,
    })

    return response.data.data
}