import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Bot,
  Cpu,
  FileSearch,
} from "lucide-react";

import ChatMessage from "./ChatMessage";
import type { Message } from "../types/conversation.types";

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
}

export default function ChatWindow({
  messages,
  loading,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="relative flex-1 rounded-3xl border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl p-6 md:p-8 overflow-y-auto mb-4 min-h-105 shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between">

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.06),transparent_70%)]" />

      {messages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="my-auto flex flex-col items-center justify-center text-center text-zinc-400 py-10 px-4 z-10"
        >
          <div className="relative mb-6 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 25,
                ease: "linear",
              }}
              className="absolute -inset-4 rounded-full border border-dashed border-cyan-500/30"
            />

            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              className="absolute -inset-2 rounded-full bg-cyan-500/10 blur-md"
            />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-500/40 bg-linear-to-b from-cyan-500/20 via-zinc-900 to-zinc-950 shadow-[0_0_35px_rgba(6,182,212,0.25)]">
              <Sparkles className="h-9 w-9 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            </div>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
            Nexus AI Assistant
          </h2>

          <p className="text-sm text-zinc-400 max-w-md mb-8 leading-relaxed">
            Search, analyze, and query your uploaded technical documents with
            real-time vector RAG context.
          </p>

          <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <div className="group p-3.5 rounded-xl border border-zinc-800/80 bg-zinc-900/50 hover:border-cyan-500/40 hover:bg-zinc-900/90 transition-all cursor-default flex items-center gap-3">
              <FileSearch className="w-4 h-4 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-xs text-zinc-300 group-hover:text-white">
                "Summarize document key points"
              </span>
            </div>

            <div className="group p-3.5 rounded-xl border border-zinc-800/80 bg-zinc-900/50 hover:border-cyan-500/40 hover:bg-zinc-900/90 transition-all cursor-default flex items-center gap-3">
              <Cpu className="w-4 h-4 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-xs text-zinc-300 group-hover:text-white">
                "Extract architecture specs"
              </span>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-6 z-10">

          {messages.map((message, index) => (
            <ChatMessage
              key={message._id ?? index}
              message={message}
            />
          ))}

          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 text-zinc-400 text-sm pt-2"
              >
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
                </div>

                <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800/90 rounded-2xl rounded-tl-xs px-4 py-3 shadow-md">
                  <span className="text-xs font-medium text-cyan-400/90">
                    Nexus AI is thinking
                  </span>

                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                        animate={{
                          y: [0, -4, 0],
                          opacity: [0.4, 1, 0.4],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8,
                          ease: "easeInOut",
                          delay: i * 0.18,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={bottomRef} />

        </div>
      )}
    </div>
  );
}