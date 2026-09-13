import React from "react";
import { Bot } from "lucide-react";
import ChatStatusBadge from "./ChatStatusBadge";

export const ChatHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between gap-4 mb-6 shrink-0 select-none">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-linear-to-br from-cyan-500/20 to-teal-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <Bot className="w-6 h-6 text-cyan-400" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              AI Assistant
            </h1>
            <ChatStatusBadge />
          </div>

          <p className="text-xs md:text-sm text-zinc-400 mt-0.5">
            Ask questions and retrieve semantic insights from your technical documents.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
