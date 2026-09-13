import React from "react";
import { useAutoResize } from "@/shared/hooks";

export interface AutoResizeTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder = "Ask Nexus about your uploaded documents...",
  disabled = false,
}) => {
  const textareaRef = useAutoResize(value, 160);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={disabled}
      placeholder={placeholder}
      rows={1}
      className="flex-1 resize-none bg-transparent text-white outline-none max-h-40 text-sm leading-relaxed"
    />
  );
};

export default AutoResizeTextarea;
