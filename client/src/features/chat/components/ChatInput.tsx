import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useConversations from "../hooks/useConversations";
import AutoResizeTextarea from "./AutoResizeTextarea";
import SendButton from "./SendButton";

interface ChatInputProps {
  sendMessage: (question: string, conversationId?: string) => Promise<void>;
  loading: boolean;
}

export default function ChatInput({ sendMessage, loading }: ChatInputProps) {
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();
  const { activeConversation, createNewConversation } = useConversations();

  const handleSend = async () => {
    const text = question.trim();
    if (!text || loading) return;

    setQuestion("");

    try {
      let conversationId = activeConversation?._id;

      if (!conversationId) {
        const conversation = await createNewConversation(text);
        conversationId = conversation._id;
        navigate(`/chat/${conversationId}`, { replace: true });
      }

      await sendMessage(text, conversationId);
    } catch (error) {
      console.error(error);
      setQuestion(text);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 backdrop-blur-xl p-4 shadow-lg">
      <div className="flex items-end gap-3">
        <AutoResizeTextarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={loading}
        />

        <SendButton
          onClick={handleSend}
          disabled={loading || !question.trim()}
          loading={loading}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500">
        <span>Press Enter to send • Shift + Enter for a new line</span>
        <span>
          {activeConversation ? "Conversation Active" : "New Conversation"}
        </span>
      </div>
    </div>
  );
}
