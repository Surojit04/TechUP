import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "orange" | "dark" | "light" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "orange",
  size = "md",
  className,
}: BadgeProps) {
  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-[11px] tracking-wider",
    md: "px-3.5 py-1 text-xs tracking-wider",
  }[size];

  const variantClasses = {
    orange: "bg-brand-orange/15 text-brand-orange border border-brand-orange/30",
    dark: "bg-ink-soft text-paper/90 border border-white/10",
    light: "bg-mist text-ink border border-ink/10",
    outline: "bg-transparent text-paper/80 border border-white/20",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center font-body font-semibold uppercase rounded-full select-none",
        sizeClasses,
        variantClasses,
        className
      )}
    >
      {children}
    </span>
  );
}
