import React from "react";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SidebarLogo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md shadow-lg shadow-black/40 flex items-center justify-between group hover:border-cyan-500/30 transition-all duration-300 cursor-pointer select-none"
      onClick={() => navigate("/")}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500 via-blue-600 to-purple-600 p-0.5">
          <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
            <Cpu className="w-5 h-5 text-cyan-400" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-base font-extrabold tracking-wider text-white font-mono">
              NEXUS
            </h1>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              AI
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 font-medium">
            Industrial AI Platform
          </p>
        </div>
      </div>

      <div className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
      </div>
    </motion.div>
  );
};

export default SidebarLogo;
