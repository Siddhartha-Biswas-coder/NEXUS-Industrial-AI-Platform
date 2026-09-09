import { useAppDispatch, useAppSelector } from "../../../shared/hooks"
import { askQuestion } from "../services/chat.service"
import { addMessage, setLoading } from "../state/chatSlice"
import type { Message } from "../state/types"


export const useChat = () => {
    const { messages, loading } = useAppSelector((state) => state.chat)
    const dispatch = useAppDispatch();

    const sendMessage = async (question: string) => {
        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: "user",
            content: question
        }

        dispatch(addMessage(userMessage));

        dispatch(setLoading(true));

        try {
            const response = await askQuestion(question);

            dispatch(
                addMessage({
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content: response.answer,
                    sources: response.sources
                })
            )
        } finally {
            dispatch(setLoading(false))
        }
    }


    return {
        messages,
        loading,
        sendMessage
    }
}


