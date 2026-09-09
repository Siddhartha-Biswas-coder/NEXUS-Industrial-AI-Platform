import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  LogOut,
  Cpu,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

import { useAuth } from "../../auth/hooks/useAuth";

export default function Sidebar() {
  const { logoutUser } = useAuth();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Documents",
      path: "/documents",
      icon: FolderOpen,
    },
    {
      name: "AI Chat",
      path: "/chat",
      icon: MessageSquare,
    },
  ];


  return (
    <aside className="w-[288px] h-screen sticky top-0 border-r border-white/10 bg-[#090a0f]/90 backdrop-blur-2xl flex flex-col justify-between p-4 overflow-hidden select-none z-30 shrink-0">
      {/* Background Ambient Glow Accents */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Content: Logo & Nav */}
      <div className="relative z-10 space-y-6">
        {/* Floating Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md shadow-lg shadow-black/40 flex items-center justify-between group hover:border-cyan-500/30 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-extrabold tracking-wider text-white">
                  NEXUS
                </h1>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium tracking-tight">
                Industrial AI Platform
              </p>
            </div>
          </div>

          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
        </motion.div>

        {/* Navigation Section */}
        <nav className="space-y-1.5">
          <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            Main Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className="block relative rounded-xl group focus:outline-none"
              >
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                      isActive
                        ? "text-cyan-300 font-semibold"
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-white/4"
                    }`}
                  >
                    {/* Active Background Glow Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBackground"
                        className="absolute inset-0 rounded-xl bg-linear-to-r from-cyan-500/20 via-blue-500/15 to-purple-500/10 border border-cyan-500/40 shadow-lg shadow-cyan-500/10"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Left Active Glow Accent Line */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute left-0 top-2 bottom-2 w-1 bg-cyan-400 rounded-r-full shadow-md shadow-cyan-400"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    <Icon
                      className={`w-5 h-5 relative z-10 transition-colors duration-300 ${
                        isActive
                          ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                          : "text-zinc-400 group-hover:text-zinc-200"
                      }`}
                    />

                    <span className="relative z-10 tracking-wide">
                      {item.name}
                    </span>

                    {isActive && (
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 ml-auto relative z-10 animate-pulse" />
                    )}
                  </motion.div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Section */}
      <div className="relative z-10 space-y-3 pt-4 border-t border-white/10">

        {/* Logout Button */}
        <motion.button
          onClick={logoutUser}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 hover:border-rose-500/40 hover:text-rose-300 hover:shadow-lg hover:shadow-rose-500/10 transition-all duration-300 group cursor-pointer"
        >
          <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
          <span className="tracking-wide">Logout Account</span>
        </motion.button>
      </div>
    </aside>
  );
}
