import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";

export interface TypingIndicatorProps {
  loading: boolean;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ loading }) => {
  return (
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
  );
};

export default TypingIndicator;
