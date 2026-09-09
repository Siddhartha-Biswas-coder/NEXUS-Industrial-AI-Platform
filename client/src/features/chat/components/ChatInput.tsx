import { useState } from "react";
import { Send, CornerDownLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  sendMessage: (question: string) => Promise<void>;
  loading: boolean;
}

export default function ChatInput({ sendMessage, loading }: ChatInputProps) {
  const [question, setQuestion] = useState("");

  const handleSubmit = async () => {
    const text = question.trim();

    if (!text || loading) return;

    setQuestion("");

    await sendMessage(text);
  };

  return (
    <div className="group relative rounded-2xl border border-zinc-800/90 bg-zinc-950/80 backdrop-blur-xl p-2.5 md:p-3 flex items-center gap-3 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-20">
      <div className="pl-2 hidden sm:block group-focus-within:text-cyan-400 transition-colors">
        <Sparkles className="w-5 h-5" />
      </div>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask anything about your technical documents..."
        rows={1}
        className="flex-1 bg-transparent resize-none outline-none text-sm md:text-base placeholder-zinc-500 min-h-11 max-h-35 py-2.5 px-1 leading-relaxed"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />

      <div className="hidden md:flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono shrink-0 select-none">
        <span>Enter</span>
        <CornerDownLeft className="w-3 h-3 text-cyan-400" />
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSubmit}
        disabled={loading || !question.trim()}
        className="relative w-11 h-11 rounded-xl bg-linear-to-r from-cyan-400 via-cyan-300 to-teal-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] disabled:opacity-30 disabled:hover:shadow-none disabled:scale-100 flex items-center justify-center transition-all duration-300 shrink-0 cursor-pointer"
      >
        <Send className="w-5 h-5 text-zinc-950 fill-zinc-950" />
      </motion.button>
    </div>
  );
}

