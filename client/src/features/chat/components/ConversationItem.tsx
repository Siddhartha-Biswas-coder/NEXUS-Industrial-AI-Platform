import { memo, useEffect, useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Conversation } from "../types/conversation.types";

interface ConversationItemProps {
  conversation: Conversation;
  active: boolean;
  onSelect: (id: string) => void;
  onRename: (id: string, title: string) => Promise<void>;
  menuOpen: boolean;
  onMenuToggle: (id: string) => void;
  onMenuClose: () => void;
}

function ConversationItem({
  conversation,
  active,
  onSelect,
  onRename,
  menuOpen,
  onMenuToggle,
  onMenuClose,
}: ConversationItemProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(conversation.title);

  useEffect(() => {
    setTitle(conversation.title);
  }, [conversation.title]);

  const saveTitle = async () => {
    const nextTitle = title.trim();

    if (!nextTitle || nextTitle === conversation.title) {
      setTitle(conversation.title);
      setEditing(false);
      return;
    }

    await onRename(conversation._id, nextTitle);
    setEditing(false);
    onMenuClose();
  };

  useEffect(() => {
    const handleClick = () => onMenuClose();
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [onMenuClose]);

  return (
    <div
      onClick={() => !editing && onSelect(conversation._id)}
      className={`group relative rounded-xl px-3 py-2 cursor-pointer transition-all duration-200 ${
        menuOpen ? "z-30 bg-white/5" : "z-0"
      } ${
        active
          ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 shadow-sm"
          : "hover:bg-white/5 text-zinc-300"
      }`}
    >
      <div className="flex items-center justify-between gap-2 relative">
        {editing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={async (e) => {
              e.stopPropagation();

              if (e.key === "Enter") {
                e.preventDefault();
                await saveTitle();
              }

              if (e.key === "Escape") {
                setTitle(conversation.title);
                setEditing(false);
              }
            }}
            onBlur={saveTitle}
            autoFocus
            className="w-full bg-transparent outline-none text-sm font-medium text-white border-b border-cyan-500/50 pb-0.5"
          />
        ) : (
          <>
            <p className="truncate text-sm font-medium flex-1">
              {conversation.title}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onMenuToggle(conversation._id);
              }}
              className={`p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer ${
                menuOpen
                  ? "opacity-100 bg-white/10 text-white"
                  : "opacity-0 group-hover:opacity-100"
              }`}
              aria-label="Conversation options"
            >
              <MoreHorizontal size={16} />
            </button>
          </>
        )}

        <AnimatePresence>
          {menuOpen && !editing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -6 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-full mt-1.5 w-44 rounded-2xl border border-white/10 bg-zinc-900/90 backdrop-blur-xl shadow-2xl shadow-black/60 z-50 p-1.5 overflow-hidden"
            >
              <motion.button
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setEditing(true);
                  onMenuClose();
                }}
                className="w-full px-3 py-2 text-xs font-medium rounded-xl flex items-center gap-2.5 hover:bg-white/5 text-zinc-300 hover:text-white transition-all duration-200 group/item cursor-pointer text-left"
              >
                <Pencil
                  size={14}
                  className="text-zinc-400 group-hover/item:text-cyan-300 group-hover/item:scale-105 transition-all duration-200"
                />
                <span>Rename</span>
              </motion.button>

              <div className="my-1 border-t border-white/10" />

              <motion.button
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onMenuClose();
                }}
                className="w-full px-3 py-2 text-xs font-medium rounded-xl flex items-center gap-2.5 hover:bg-red-500/10 text-red-400 transition-all duration-200 group/item cursor-pointer text-left"
              >
                <Trash2
                  size={14}
                  className="text-red-400/80 group-hover/item:text-red-400 group-hover/item:scale-105 transition-all duration-200"
                />
                <span>Delete</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-[11px] text-zinc-500 mt-1">
        {new Date(conversation.lastMessageAt).toLocaleDateString()}
      </p>
    </div>
  );
}

export default memo(ConversationItem);
