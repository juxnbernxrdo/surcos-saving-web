"use client";

import React, { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  requiredBadge?: boolean;
  size?: "sm" | "md";
}

/**
 * Input - Core input control strictly implementing the Pill System (SPEC-129)
 * - md = 48px (h-12) rounded-full
 * - sm = 40px (h-10) rounded-full
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      requiredBadge = false,
      size = "md",
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full space-y-1.5 font-sans">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-3)]"
          >
            {label}{" "}
            {requiredBadge && <span className="text-[var(--red)]" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={cn(
              "w-full rounded-full border text-sm font-medium text-[var(--text-1)] bg-[var(--white)] shadow-xs transition-[background-color,border-color,color,box-shadow] duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] outline-none",
              size === "sm" ? "h-10 px-4 text-xs" : "h-12 px-4 text-sm",
              "placeholder:text-[var(--text-4)]",
              "hover:border-[var(--text-3)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--off-white)]",
              leftIcon ? "pl-11" : "",
              rightIcon ? "pr-11" : "",
              error
                ? "border-[var(--red)] focus:border-[var(--red)] focus:ring-[var(--red-soft)]"
                : "border-[var(--border)]",
              className
            )}
            {...props}
          />
          {leftIcon && (
            <div className="absolute inset-y-0 left-3.5 z-10 text-[var(--text-3)] pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          {rightIcon && (
            <div className="absolute inset-y-0 right-3.5 z-10 text-[var(--text-3)] flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p id={errorId} className="text-xs text-[var(--red)] font-medium mt-1 flex items-center gap-1" role="alert">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-[var(--text-3)] mt-1">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
