"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export function Switch({
  checked,
  onCheckedChange,
  label,
  description,
  disabled = false,
  id,
  className,
}: SwitchProps) {
  const generatedId = useId();
  const switchId = id || generatedId;

  return (
    <div className={cn("flex items-center justify-between gap-4 py-2", className)}>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={switchId}
              className="text-sm font-medium text-[var(--text-1)] cursor-pointer select-none"
            >
              {label}
            </label>
          )}
          {description && (
            <span className="text-xs text-[var(--text-3)] leading-relaxed">
              {description}
            </span>
          )}
        </div>
      )}
      <button
        type="button"
        role="switch"
        id={switchId}
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--white)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          checked ? "bg-[var(--accent)]" : "bg-[var(--border)]"
        )}
      >
        <span
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-xs ring-0 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}
