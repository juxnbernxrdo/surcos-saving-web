"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "cta";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Button - Core UI Primitive adhering to Pill System (SPEC-129)
 * and Emil Kowalski micro-interaction principles:
 * - Active tactile press: scale(0.97)
 * - Duration: <= 200ms with custom ease-out
 * - Focus ring: 2px offset ring
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      primary:
        "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] shadow-xs hover:shadow-sm focus-visible:ring-[var(--accent)]",
      secondary:
        "bg-[var(--white)] text-[var(--text-1)] border border-[var(--border)] hover:bg-[var(--off-white)] hover:border-[var(--text-3)] focus-visible:ring-[var(--accent)]",
      outline:
        "bg-transparent text-[var(--text-1)] border border-[var(--border)] hover:bg-[var(--off-white)] focus-visible:ring-[var(--accent)]",
      ghost:
        "bg-transparent text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--off-white)] focus-visible:ring-[var(--accent)]",
      danger:
        "bg-[var(--red)] text-white hover:opacity-90 shadow-xs focus-visible:ring-[var(--red)]",
      cta:
        "bg-[var(--cta-bg)] text-[var(--cta-text)] hover:opacity-90 shadow-sm focus-visible:ring-[var(--accent)]",
    };

    const sizeClasses = {
      sm: "h-8 px-3.5 text-xs rounded-full gap-1.5 font-medium",
      md: "h-9.5 px-4.5 text-[13px] rounded-full gap-2 font-medium",
      lg: "h-11 px-6 text-sm rounded-full gap-2.5 font-semibold",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-sans tracking-tight cursor-pointer select-none",
          "transition-[transform,background-color,border-color,color,opacity,box-shadow] duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]",
          "active:scale-[0.97]",
          "disabled:opacity-45 disabled:pointer-events-none disabled:active:scale-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--white)]",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin flex-shrink-0" aria-hidden="true" />
        ) : (
          leftIcon && <span className="flex-shrink-0 inline-flex items-center">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="flex-shrink-0 inline-flex items-center">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
