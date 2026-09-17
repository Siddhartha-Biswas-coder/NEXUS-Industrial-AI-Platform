import React from "react";
import { Bot, FileText } from "lucide-react";
import ChatStatusBadge from "./ChatStatusBadge";

interface ChatHeaderProps {
  onOpenSources?: () => void;
  activeCount?: number;
  disabled?: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  onOpenSources,
  activeCount = 0,
  disabled = false,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-4 shrink-0 select-none border-b border-zinc-800/60 pb-4">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-cyan-500/20 via-cyan-500/10 to-teal-500/5 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <Bot className="w-6 h-6 text-cyan-400" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              AI Assistant
            </h1>
            <ChatStatusBadge />
          </div>

          <p className="text-xs text-zinc-400 mt-0.5">
            Ask questions and retrieve semantic insights from your technical documents.
          </p>
        </div>
      </div>

      {onOpenSources && (
        <button
          onClick={onOpenSources}
          disabled={disabled}
          type="button"
          title="Manage active document sources"
          className={`group flex items-center gap-2.5 px-4 py-2 rounded-2xl border transition-all duration-200 ${
            activeCount > 0
              ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              : "border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
          } disabled:opacity-40 disabled:pointer-events-none cursor-pointer`}
        >
          <div className="relative">
            <FileText
              className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                activeCount > 0 ? "text-cyan-400" : "text-zinc-400"
              }`}
            />
            {activeCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            )}
          </div>
          <span className="text-xs font-medium tracking-wide">Sources</span>
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg transition-colors ${
              activeCount > 0
                ? "bg-cyan-500/20 text-cyan-200 border border-cyan-500/30"
                : "bg-zinc-800 text-zinc-400 border border-zinc-700/50"
            }`}
          >
            {activeCount}
          </span>
        </button>
      )}
    </div>
  );
};

export default ChatHeader;

