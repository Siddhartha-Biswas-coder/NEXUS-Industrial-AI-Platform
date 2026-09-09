import api from "../../../shared/lib/axios";
import type { ChatResponse } from "../state/types.ts";

export const askQuestion = async (
    question: string
): Promise<ChatResponse> => {
    const response = await api.post("/chat", {
        question,
    })

    return response.data.data
}