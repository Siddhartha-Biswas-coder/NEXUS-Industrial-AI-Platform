import { useState } from "react";
import { SendHorizonal, Loader2 } from "lucide-react";

import useConversations from "../hooks/useConversations";

interface ChatInputProps {
  sendMessage: (question: string, conversationId?: string) => Promise<void>;
  loading: boolean;
}

export default function ChatInput({
  sendMessage,
  loading,
}: ChatInputProps) {
  const [question, setQuestion] = useState("");

  const { activeConversation, createNewConversation } = useConversations();

  const handleSend = async () => {
    const text = question.trim();

    if (!text || loading) return;

    setQuestion("");

    try {
      let conversationId = activeConversation?._id;

      if (!conversationId) {
        const conversation = await createNewConversation();
        conversationId = conversation._id;
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
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask Nexus about your uploaded documents..."
          rows={1}
          className="flex-1 resize-none bg-transparent text-white outline-none max-h-40"
        />

        <button
          onClick={handleSend}
          disabled={loading || !question.trim()}
          className="h-11 w-11 rounded-xl hover:bg-cyan-400 disabled:bg-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin text-black" />
          ) : (
            <SendHorizonal className="h-5 w-5 text-black" />
          )}
        </button>
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