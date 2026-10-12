"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "success" | "warning" | "outline";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantClasses = {
    default: "bg-[var(--off-white)] text-[var(--text-2)] border border-[var(--border-light)]",
    accent: "bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/20 font-semibold",
    success: "bg-[var(--green-soft)] text-[var(--green)] border border-[var(--green)]/20 font-semibold",
    warning: "bg-[var(--amber-soft)] text-[var(--amber)] border border-[var(--amber)]/20 font-semibold",
    outline: "bg-transparent text-[var(--text-3)] border border-[var(--border)]",
  };

  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-[11px] rounded-full gap-1",
    md: "px-3.5 py-1 text-xs rounded-full gap-1.5 font-medium tracking-wide",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center tracking-tight transition-colors select-none",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
