import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, FolderOpen, MessageSquare, Sparkles } from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Documents", path: "/documents", icon: FolderOpen },
  { name: "AI Chat", path: "/chat", icon: MessageSquare },
];

export const SidebarNavigation: React.FC = () => {
  return (
    <nav className="space-y-1.5 select-none">
      <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        Main Menu
      </div>

      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.name}
            to={item.path}
            className="block relative rounded-xl"
          >
            {({ isActive }) => (
              <motion.div
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  isActive
                    ? "text-cyan-300 font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-white/4"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 rounded-xl bg-linear-to-r from-cyan-500/20 via-blue-500/15 to-purple-500/10 border border-cyan-500/40"
                  />
                )}

                <Icon className="relative z-10 w-5 h-5" />
                <span className="relative z-10">{item.name}</span>

                {isActive && (
                  <Sparkles className="relative z-10 ml-auto w-3.5 h-3.5 text-cyan-400" />
                )}
              </motion.div>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default SidebarNavigation;
