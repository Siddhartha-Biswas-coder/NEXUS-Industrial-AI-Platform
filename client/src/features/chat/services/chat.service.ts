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

export const askQuestionStream = async (
    conversationId: string,
    question: string,
    onEvent: (event: any) => void
) => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(
        `${api.defaults.baseURL}/chat/stream`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Accept: "text/event-stream",
            },
            body: JSON.stringify({
                conversationId,
                question,
            }),
        }
    );

    if (!response.ok || !response.body) {
        throw new Error("Streaming request failed.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {
        const { value, done } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split("\n\n");

        buffer = events.pop() ?? "";

        for (const event of events) {
            if (!event.startsWith("data: ")) continue;

            const payload = JSON.parse(event.slice(6));

            onEvent(payload);
        }
    }
};