import React from "react";
import { Plus } from "lucide-react";
import { IconButton } from "@/shared/components/Button";

export interface ConversationHeaderProps {
  onNewChat: () => void;
}

export const ConversationHeader: React.FC<ConversationHeaderProps> = ({ onNewChat }) => {
  return (
    <div className="flex items-center justify-between px-2 mb-3 select-none">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        Conversations
      </span>
      <IconButton
        icon={Plus}
        size="sm"
        label="New Conversation"
        onClick={onNewChat}
        className="hover:text-cyan-300"
      />
    </div>
  );
};

export default ConversationHeader;
