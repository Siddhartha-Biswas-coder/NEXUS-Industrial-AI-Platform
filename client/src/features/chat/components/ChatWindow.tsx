import { useEffect, useRef } from "react";
import EmptyChatState from "./EmptyChatState";
import MessageList from "./MessageList";
import type { Message } from "../types/conversation.types";

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
}

export default function ChatWindow({ messages, loading }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="relative flex-1 rounded-3xl border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl p-6 md:p-8 overflow-y-auto mb-4 min-h-105 shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.06),transparent_70%)]" />

      {messages.length === 0 ? (
        <EmptyChatState />
      ) : (
        <MessageList
          messages={messages}
          loading={loading}
          bottomRef={bottomRef}
        />
      )}
    </div>
  );
}