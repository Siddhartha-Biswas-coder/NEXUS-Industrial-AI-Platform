import React from "react";
import { cn } from "@/shared/utils/cn";

export interface StatusBadgeProps {
  status?: "uploaded" | "processing" | "indexed" | "failed" | string;
  label?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  className,
}) => {
  const normalized = status?.toLowerCase() || "indexed";

  const styles: Record<string, { badge: string; dot: string; text: string }> = {
    indexed: {
      badge: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
      dot: "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]",
      text: "Indexed",
    },
    processing: {
      badge: "bg-purple-500/10 border-purple-500/30 text-purple-300",
      dot: "bg-purple-400 animate-pulse",
      text: "Processing",
    },
    uploaded: {
      badge: "bg-blue-500/10 border-blue-500/30 text-blue-300",
      dot: "bg-blue-400",
      text: "Uploaded",
    },
    failed: {
      badge: "bg-red-500/10 border-red-500/30 text-red-300",
      dot: "bg-red-400",
      text: "Failed",
    },
  };

  const current = styles[normalized] || styles.indexed;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-md select-none",
        current.badge,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", current.dot)} />
      <span>{label || current.text}</span>
    </span>
  );
};

export default StatusBadge;
