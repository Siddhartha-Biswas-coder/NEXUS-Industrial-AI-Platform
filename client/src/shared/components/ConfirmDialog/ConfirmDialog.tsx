import React from "react";
import Modal from "@/shared/components/Modal/Modal";
import Button from "@/shared/components/Button/Button";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  subtitle?: string;
  description?: React.ReactNode;
  icon?: React.ElementType;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "primary";
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  subtitle,
  description,
  icon: Icon,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center gap-3 mb-4">
        {Icon && (
          <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
            <Icon className="h-5 w-5 text-red-400" />
          </div>
        )}

        <div>
          <h3 className="text-white font-semibold">{title}</h3>
          {subtitle && <p className="text-xs text-zinc-400">{subtitle}</p>}
        </div>
      </div>

      {description && <div className="text-sm text-zinc-300 mb-6">{description}</div>}

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant={variant} onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
