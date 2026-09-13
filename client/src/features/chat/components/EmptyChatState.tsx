import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Cpu, FileSearch } from "lucide-react";

export const EmptyChatState: React.FC = () => {
  return (
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

      <h2 className="text-2xl font-bold tracking-tight text-white mb-2 font-mono">
        Nexus AI Assistant
      </h2>

      <p className="text-sm text-zinc-400 max-w-md mb-8 leading-relaxed">
        Search, analyze, and query your uploaded technical documents with real-time vector RAG context.
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
  );
};

export default EmptyChatState;
