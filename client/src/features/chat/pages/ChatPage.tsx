import { useEffect } from "react";
import { Bot } from "lucide-react";

import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import { useChat } from "../hooks/useChat";
import useConversations from "../hooks/useConversations";

export default function ChatPage() {
  const chat = useChat();
  const { loadConversations } = useConversations();

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  return (
    <div className="h-full max-w-5xl mx-auto flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6 shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-linear-to-br from-cyan-500/20 to-teal-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <Bot className="w-6 h-6 text-cyan-400" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                AI Assistant
              </h1>

              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-semibold text-cyan-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                RAG Vector Engine
              </span>
            </div>

            <p className="text-xs md:text-sm text-zinc-400 mt-0.5">
              Ask questions and retrieve semantic insights from your technical
              documents.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <ChatWindow messages={chat.messages} loading={chat.loading} />

        <ChatInput
          sendMessage={chat.sendMessage}
          loading={chat.loading}
        />
      </div>

    </div>
  );
}