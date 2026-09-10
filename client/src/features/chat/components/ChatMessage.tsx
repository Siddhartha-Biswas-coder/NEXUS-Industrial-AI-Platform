import type { Message } from "../state/types";
import SourceCard from "./SourceCard";
import { motion } from "framer-motion";
import { Sparkles, User, BookOpen } from "lucide-react";
import TypingText from "./TypingText";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex items-start gap-3 md:gap-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar Icon */}
      {isUser ? (
        <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5 shadow-sm">
          <User className="w-4 h-4 text-cyan-300" />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-xl bg-linear-to-br from-cyan-500/25 to-teal-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </div>
      )}

      {/* Message Bubble Container */}
      <div
        className={`max-w-[85%] sm:max-w-[80%] rounded-2xl ${
          isUser
            ? "bg-linear-to-r from-cyan-400 via-cyan-300 to-teal-300 text-zinc-950 font-medium rounded-tr-xs px-5 py-3.5 shadow-[0_4px_20px_rgba(6,182,212,0.25)] text-sm md:text-[15px]"
            : "bg-zinc-900/90 border border-zinc-800/90 text-zinc-100 rounded-tl-xs px-5 py-4 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] text-sm md:text-[15px] leading-relaxed"
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold tracking-wide text-cyan-400 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Nexus AI</span>
          </div>
        )}

        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed">
            {message.content}
          </p>
        ) : (
          <TypingText text={message.content} />
        )}

        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-4 pt-4 border-t border-zinc-800/80 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-400">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Context Sources Cited ({message.sources.length})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {message.sources.map((source, index) => (
                <SourceCard key={index} source={source} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}