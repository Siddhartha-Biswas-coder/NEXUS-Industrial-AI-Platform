import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import useConversations from "@/features/chat/hooks/useConversations";
import SidebarLogo from "./SidebarLogo";
import SidebarNavigation from "./SidebarNavigation";
import ConversationSection from "./ConversationSection";
import DeleteConversationModal from "./DeleteConversationModal";
import type { Conversation } from "@/features/chat/types/conversation.types";

export default function Sidebar() {
  const { logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    conversations,
    activeConversation,
    loading,
    renameConversationById,
    deleteConversationById,
  } = useConversations();

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Conversation | null>(null);

  const isChatPage = location.pathname.startsWith("/chat");

  const handleConversationSelect = useCallback(
    (id: string) => {
      navigate(`/chat/${id}`);
    },
    [navigate]
  );

  const handleNewChat = useCallback(() => {
    navigate("/chat");
  }, [navigate]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return;

    const updatedConversations = await deleteConversationById(deleteTarget._id);
    setDeleteTarget(null);
    setOpenMenuId(null);

    if (updatedConversations.length > 0) {
      navigate(`/chat/${updatedConversations[0]._id}`);
    } else {
      navigate(`/chat`);
    }
  }, [deleteTarget, deleteConversationById, navigate]);

  return (
    <aside className="w-[288px] h-full rounded-2xl md:rounded-3xl border border-white/10 bg-zinc-950/70 backdrop-blur-2xl flex flex-col p-4 overflow-hidden select-none z-30 shrink-0 shadow-xl shadow-black/40">
      {/* Ambient Background Glows */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col min-h-0 space-y-6">
        <SidebarLogo />
        <SidebarNavigation />

        {isChatPage && (
          <ConversationSection
            conversations={conversations}
            activeConversation={activeConversation}
            loading={loading}
            openMenuId={openMenuId}
            onNewChat={handleNewChat}
            onSelect={handleConversationSelect}
            onRename={renameConversationById}
            onMenuToggle={(id) => setOpenMenuId((prev) => (prev === id ? null : id))}
            onMenuClose={() => setOpenMenuId(null)}
            onDelete={(conversation) => {
              setDeleteTarget(conversation);
              setOpenMenuId(null);
            }}
          />
        )}
      </div>

      {/* Delete Confirmation Modal (Portaled to document.body) */}
      <DeleteConversationModal
        deleteTarget={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Footer Logout Button */}
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
