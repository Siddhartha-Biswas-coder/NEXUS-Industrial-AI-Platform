import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/shared/utils/cn";

export interface IconButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  icon: React.ElementType;
  variant?: "ghost" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  label?: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon: Icon,
      variant = "ghost",
      size = "md",
      label,
      className,
      whileHover,
      whileTap,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      ghost: "text-zinc-400 hover:text-white hover:bg-white/5",
      secondary: "bg-zinc-900/70 border border-white/10 text-zinc-300 hover:text-white hover:border-cyan-500/30",
      danger: "text-zinc-400 hover:text-red-400 hover:bg-red-500/10",
    };

    const sizes = {
      sm: "w-7 h-7 text-xs",
      md: "w-9 h-9 text-sm",
      lg: "w-11 h-11 text-base",
    };

    const iconSizes = {
      sm: "w-3.5 h-3.5",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={whileHover ?? { scale: 1.05 }}
        whileTap={whileTap ?? { scale: 0.95 }}
        aria-label={label}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        <Icon className={iconSizes[size]} />
      </motion.button>
    );
  }
);

IconButton.displayName = "IconButton";
export default IconButton;
