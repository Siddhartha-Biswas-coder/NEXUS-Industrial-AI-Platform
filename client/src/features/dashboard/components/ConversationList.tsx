import React from "react";
import ConversationItem from "@/features/chat/components/ConversationItem";
import type { Conversation } from "@/features/chat/types/conversation.types";

export interface ConversationListProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  loading: boolean;
  openMenuId: string | null;
  onSelect: (id: string) => void;
  onRename: (id: string, newTitle: string) => Promise<boolean>;
  onMenuToggle: (id: string) => void;
  onMenuClose: () => void;
  onDelete: (conversation: Conversation) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversation,
  loading,
  openMenuId,
  onSelect,
  onRename,
  onMenuToggle,
  onMenuClose,
  onDelete,
}) => {
  if (conversations.length === 0) {
    return loading ? (
      <p className="text-xs text-zinc-500 px-2">Loading...</p>
    ) : (
      <p className="text-xs text-zinc-500 px-2">No conversations yet.</p>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pr-1 space-y-1">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation._id}
          conversation={conversation}
          active={activeConversation?._id === conversation._id}
          onSelect={onSelect}
          onRename={onRename}
          menuOpen={openMenuId === conversation._id}
          onMenuToggle={onMenuToggle}
          onMenuClose={onMenuClose}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ConversationList;
