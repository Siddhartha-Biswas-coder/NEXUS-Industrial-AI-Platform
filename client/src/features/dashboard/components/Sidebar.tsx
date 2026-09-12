import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  LogOut,
  Cpu,
  Sparkles,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../auth/hooks/useAuth";
import useConversations from "../../chat/hooks/useConversations";

export default function Sidebar() {
  const { logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { conversations, activeConversation, loading, createNewConversation } =
    useConversations();

  const isChatPage = location.pathname.startsWith("/chat");

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Documents", path: "/documents", icon: FolderOpen },
    { name: "AI Chat", path: "/chat", icon: MessageSquare },
  ];

  return (
    <aside className="w-[288px] h-screen sticky top-0 border-r border-white/10 bg-[#090a0f]/90 backdrop-blur-2xl flex flex-col p-4 overflow-hidden select-none z-30 shrink-0">
      {/* Ambient Glows */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Scrollable Content */}
      <div className="relative z-10 flex-1 flex flex-col min-h-0 space-y-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md shadow-lg shadow-black/40 flex items-center justify-between group hover:border-cyan-500/30 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500 via-blue-600 to-purple-600 p-0.5">
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

        {/* Navigation */}
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

        {/* Conversations */}
        {isChatPage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col min-h-0 border-t border-white/10 pt-5"
          >
            <div className="flex items-center justify-between px-2 mb-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Conversations
              </span>

              <button
                onClick={async () => {
                  const conversation = await createNewConversation();
                  navigate(`/chat/${conversation._id}`);
                }}
                className="p-1 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-cyan-300 transition cursor-pointer"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-1">
              {loading ? (
                <p className="text-xs text-zinc-500 px-2">Loading...</p>
              ) : conversations.length === 0 ? (
                <p className="text-xs text-zinc-500 px-2">
                  No conversations yet.
                </p>
              ) : (
                conversations.map((conversation) => (
                  <button
                    key={conversation._id}
                    onClick={async () => {
                      navigate(`/chat/${conversation._id}`);
                    }}
                    className={`w-full rounded-xl px-3 py-2 text-left transition ${
                      activeConversation?._id === conversation._id
                        ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-300"
                        : "hover:bg-white/5 text-zinc-300"
                    }`}
                  >
                    <p className="truncate text-sm font-medium">
                      {conversation.title}
                    </p>

                    <p className="text-[11px] text-zinc-500">
                      {new Date(
                        conversation.lastMessageAt,
                      ).toLocaleDateString()}
                    </p>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Logout */}
      <div className="relative z-10 pt-4 border-t border-white/10">
        <motion.button
          onClick={logoutUser}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 hover:border-rose-500/40 transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Logout Account
        </motion.button>
      </div>
    </aside>
  );
}
