import { memo } from "react";
import type { Conversation } from "../types/conversation.types";

interface ConversationItemProps {
  conversation: Conversation;
  active: boolean;
  onClick: () => void;
}

const ConversationItem = ({
  conversation,
  active,
  onClick,
}: ConversationItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl px-3 py-2 text-left transition ${
        active
          ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-300"
          : "hover:bg-white/5 text-zinc-300"
      }`}
    >
      <p className="truncate text-sm font-medium">{conversation.title}</p>

      <p className="text-[11px] text-zinc-500">
        {new Date(conversation.lastMessageAt).toLocaleDateString()}
      </p>
    </button>
  );
};

export default memo(ConversationItem);
