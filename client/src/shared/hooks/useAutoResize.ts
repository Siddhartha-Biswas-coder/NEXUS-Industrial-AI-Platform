import { useEffect, useRef } from "react";

export function useAutoResize(value: string, maxHeight: number = 200) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const nextHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${nextHeight}px`;
  }, [value, maxHeight]);

  return textareaRef;
}

export default useAutoResize;
