import React from "react";
import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog";
import type { Conversation } from "@/features/chat/types/conversation.types";

export interface DeleteConversationModalProps {
  deleteTarget: Conversation | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConversationModal: React.FC<DeleteConversationModalProps> = ({
  deleteTarget,
  onClose,
  onConfirm,
}) => {
  if (!deleteTarget) return null;

  return (
    <ConfirmDialog
      isOpen={Boolean(deleteTarget)}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Conversation"
      subtitle="This action cannot be undone."
      icon={Trash2}
      confirmText="Delete"
      cancelText="Cancel"
      variant="danger"
      description={
        <span>
          Delete <span className="font-semibold">"{deleteTarget.title}"</span>?
        </span>
      }
    />
  );
};

export default DeleteConversationModal;
