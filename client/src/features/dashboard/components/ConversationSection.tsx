import React from "react";
import ConversationHeader from "./ConversationHeader";
import ConversationList from "./ConversationList";
import type { Conversation } from "@/features/chat/types/conversation.types";

export interface ConversationSectionProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  loading: boolean;
  openMenuId: string | null;
  onNewChat: () => void;
  onSelect: (id: string) => void;
  onRename: (id: string, newTitle: string) => Promise<boolean>;
  onMenuToggle: (id: string) => void;
  onMenuClose: () => void;
  onDelete: (conversation: Conversation) => void;
}

export const ConversationSection: React.FC<ConversationSectionProps> = ({
  conversations,
  activeConversation,
  loading,
  openMenuId,
  onNewChat,
  onSelect,
  onRename,
  onMenuToggle,
  onMenuClose,
  onDelete,
}) => {
  return (
    <div className="flex-1 flex flex-col min-h-0 border-t border-white/10 pt-5">
      <ConversationHeader onNewChat={onNewChat} />
      <ConversationList
        conversations={conversations}
        activeConversation={activeConversation}
        loading={loading}
        openMenuId={openMenuId}
        onSelect={onSelect}
        onRename={onRename}
        onMenuToggle={onMenuToggle}
        onMenuClose={onMenuClose}
        onDelete={onDelete}
      />
    </div>
  );
};

export default ConversationSection;
