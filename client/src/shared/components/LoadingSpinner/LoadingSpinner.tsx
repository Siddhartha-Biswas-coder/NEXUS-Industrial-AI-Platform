import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className,
  label,
}) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className="flex items-center justify-center gap-2 text-zinc-400">
      <Loader2 className={cn("animate-spin text-cyan-400", sizes[size], className)} />
      {label && <span className="text-xs font-medium">{label}</span>}
    </div>
  );
};

export default LoadingSpinner;
