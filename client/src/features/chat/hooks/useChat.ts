import { useAppDispatch, useAppSelector } from "../../../shared/hooks"
import { askQuestion } from "../services/chat.service"
import { addMessage, setLoading, updateConversation } from "../state/conversationSlice"
import type { Message } from "../types/conversation.types"


export const useChat = () => {
    const dispatch = useAppDispatch();

    const {
        messages,
        loading,
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
        dispatch(setLoading(true));

        try {
            const response = await askQuestion(
                id,
                question
            );

            dispatch(
                addMessage({
                    role: "assistant",
                    content: response.answer,
                    sources: response.sources,
                })
            );

            dispatch(updateConversation(response.conversation))
        } finally {
            dispatch(setLoading(false));
        }
    };


    return {
        messages,
        loading,
        sendMessage
    }
}


