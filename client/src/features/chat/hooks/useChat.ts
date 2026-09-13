import { useAppDispatch, useAppSelector } from "../../../shared/hooks"
import { askQuestionStream } from "../services/chat.service"
import {
    addMessage, updateConversation,
    appendToLastAssistantMessage,
    updateLastAssistantMessage,
    setGenerating,
    setStreaming
} from "../state/conversationSlice"
import type { Message } from "../types/conversation.types"


export default function useChat() {
    const dispatch = useAppDispatch();

    const {
        messages,
        loadingHistory,
        generating,
        streaming,
        activeConversation,
    } = useAppSelector((state) => state.conversation);

    const sendMessage = async (
        question: string,
        conversationId?: string
    ) => {
        const id =
            conversationId ??
            activeConversation?._id;

        if (!id) {
            throw new Error("No active conversation.");
        }

        const userMessage: Message = {
            role: "user",
            content: question,
        };

        dispatch(addMessage(userMessage));

        dispatch(setGenerating(true));
        dispatch(setStreaming(true));

        let hasStartedStreaming = false;

        try {
            await askQuestionStream(
                id,
                question,
                (event) => {
                    switch (event.type) {
                        case "token":
                            if (!hasStartedStreaming) {
                                hasStartedStreaming = true;
                                dispatch(
                                    addMessage({
                                        role: "assistant",
                                        content: event.content,
                                        sources: [],
                                    })
                                );
                            } else {
                                dispatch(appendToLastAssistantMessage(event.content));
                            }
                            break;
                        case "sources":
                            dispatch(updateLastAssistantMessage(event.sources));
                            break;
                        case "conversation":
                            dispatch(updateConversation(event.conversation));
                            break;
                        case "done":
                            dispatch(setStreaming(false));
                            dispatch(setGenerating(false));
                            break;
                        case "error":
                            dispatch(setStreaming(false));
                            dispatch(setGenerating(false));
                            console.error(event.message);
                            break
                    }
                }
            );
        } catch (error) {
            console.error(error)
            dispatch(setStreaming(false));
            dispatch(setGenerating(false));
        }
    };


    return {
        messages,
        loadingHistory,
        generating,
        streaming,
        sendMessage
    }
}


