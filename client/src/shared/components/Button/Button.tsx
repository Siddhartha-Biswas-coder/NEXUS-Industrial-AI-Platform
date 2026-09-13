import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/shared/utils/cn";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      children,
      whileHover,
      whileTap,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/20 border border-white/10",
      secondary:
        "bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10",
      danger:
        "bg-red-500 hover:bg-red-400 text-white shadow-lg shadow-red-500/20",
      ghost:
        "bg-transparent text-zinc-400 hover:text-white hover:bg-white/5",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs gap-1.5",
      md: "px-4 py-2 text-sm gap-2",
      lg: "px-6 py-3 text-base gap-2.5",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={whileHover ?? { scale: 1.02 }}
        whileTap={whileTap ?? { scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
