import type { Message, MessageSource } from "../types/conversation.types";
import SourceCard from "./SourceCard";
import { motion } from "framer-motion";
import { Sparkles, User, BookOpen } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  streaming?: boolean;
}

export default function ChatMessage({ message, streaming }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3.5 ${isUser ? "flex-row-reverse" : "flex-row"} mb-6 group`}
    >
      <div
        className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
          isUser
            ? "bg-linear-to-tr from-cyan-500 to-blue-600 text-white"
            : "bg-zinc-900 border border-white/10 text-cyan-400"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Sparkles className="w-4 h-4" />
        )}
      </div>

      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 shadow-lg backdrop-blur-md border ${
          isUser
            ? "bg-cyan-500/10 border-cyan-500/30 text-white rounded-tr-sm"
            : "bg-zinc-900/80 border-white/10 text-zinc-100 rounded-tl-sm"
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap font-normal wrap-break-word">
            {message.content}
          </p>
        ) : (
          <div className="text-sm leading-relaxed whitespace-pre-wrap font-normal wrap-break-word">
            {message.content}
            {streaming && (
              <span className="inline-block ml-0.5 text-cyan-400 animate-pulse">
                ▍
              </span>
            )}
          </div>
        )}

        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-4 pt-4 border-t border-zinc-800/80 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-400">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Context Sources Cited ({message.sources.length})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {message.sources.map((source: MessageSource, index: number) => (
                <SourceCard key={index} source={source} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
