import React from "react";
import { SendHorizonal, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";

export interface SendButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

export const SendButton: React.FC<SendButtonProps> = ({
  onClick,
  disabled,
  loading,
}) => {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-11 w-11 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-md",
        disabled
          ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5"
          : "bg-linear-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-zinc-950 shadow-cyan-500/20"
      )}
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <SendHorizonal className="h-5 w-5" />
      )}
    </motion.button>
  );
};

export default SendButton;
