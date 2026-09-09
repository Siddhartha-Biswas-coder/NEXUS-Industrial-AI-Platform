import { Search, Bell, Sparkles, Command } from "lucide-react";
import { motion } from "framer-motion";
import { useAppSelector } from "../../../shared/hooks";

export default function Topbar() {
  const user = useAppSelector((state) => state.auth.user);

  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="top-0 z-20 h-20 px-4 sm:px-8 flex items-center justify-between border-b border-white/10 bg-[#090a0f]/80 backdrop-blur-xl relative overflow-hidden select-none"
    >
      {/* Background Ambient Glowing Accents */}
      <div className="absolute top-0 right-1/3 w-96 h-20 bg-cyan-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-10 w-64 h-20 bg-purple-500/10 blur-[80px] pointer-events-none" />

      {/* Left Section: Welcome Greeting & Workspace Subtitle */}
      <div className="relative z-10 space-y-0.5">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <span>Welcome back,</span>
            <span className="bg-linear-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
              {user?.name || "Engineer"}
            </span>
          </h1>
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </motion.div>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <span>Industrial AI Workspace</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">Neural Engine Online</span>
        </div>
      </div>

      {/* Right Section: Search, Notifications & User Pill */}
      <div className="relative z-10 flex items-center gap-3 sm:gap-4">
        {/* Search Bar */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="hidden md:flex items-center gap-2.5 rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-2 text-zinc-400 w-72 backdrop-blur-md shadow-lg shadow-black/20 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all duration-300 group"
        >
          <Search className="w-4 h-4 group-focus-within:text-cyan-400 transition-colors" />
          <input
            type="text"
            placeholder="Search documents..."
            className="bg-transparent outline-none text-xs sm:text-sm text-white w-full"
          />
          <div className="flex items-center gap-0.5 text-[10px] font-semibold text-zinc-400 bg-zinc-800/80 px-1.5 py-0.5 rounded-md border border-white/10">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </motion.div>

        {/* Animated Notification Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2.5 sm:p-3 rounded-2xl border border-white/10 bg-zinc-900/70 text-zinc-300 hover:text-white hover:border-cyan-500/30 hover:bg-zinc-800/80 backdrop-blur-md shadow-md transition-all duration-300 group cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
          {/* Notification Ping Badge */}
          <span className="absolute top-2 right-2 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
        </motion.button>

        {/* User Badge Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/70 px-3 py-2 backdrop-blur-md shadow-md hover:border-cyan-500/30 transition-all duration-300 group cursor-pointer"
        >
          <div className="relative shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-linear-to-tr from-cyan-500 via-blue-500 to-purple-600 p-0.5 shadow-md shadow-cyan-500/20">
            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center font-bold text-xs sm:text-sm text-cyan-300">
              {initials}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-zinc-950 rounded-full" />
          </div>

          <div className="hidden sm:block text-left">
            <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
              {user?.name || "Engineer"}
            </p>
            <p className="text-[11px] text-zinc-400 capitalize font-medium">
              {user?.role || "User"}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
