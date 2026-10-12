"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  selectable?: boolean;
  badgeText?: string;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  type?: "radio" | "checkbox" | "default";
  compact?: boolean;
}

export function Card({
  className,
  selected = false,
  selectable = true,
  badgeText,
  icon,
  title,
  description,
  type = "default",
  compact = false,
  onClick,
  children,
  ...props
}: CardProps) {
  if (compact) {
    return (
      <div
        role={selectable ? (type === "checkbox" ? "checkbox" : "radio") : "group"}
        aria-checked={selectable ? selected : undefined}
        tabIndex={selectable ? 0 : undefined}
        onClick={onClick}
        onKeyDown={(e) => {
          if (selectable && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onClick?.(e as any);
          }
        }}
        className={cn(
          "relative flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] text-left min-h-[44px]",
          selectable ? "cursor-pointer select-none active:scale-[0.98]" : "",
          selected
            ? "border-[var(--accent)] bg-[var(--accent-soft)] ring-1 ring-[var(--accent)] text-[var(--accent)]"
            : "border-[var(--border-light)] bg-[var(--white)] hover:border-[var(--border)] hover:bg-[var(--off-white)] text-[var(--text-1)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
          className
        )}
        {...props}
      >
        {icon && (
          <div
            className={cn(
              "flex items-center justify-center w-7 h-7 rounded-xl flex-shrink-0 transition-colors",
              selected
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--off-white)] text-[var(--text-3)]"
            )}
          >
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="text-xs sm:text-sm font-semibold tracking-tight leading-none text-inherit">
            {title}
          </h4>
          {description && (
            <p className="text-[11px] text-[var(--text-3)] mt-0.5 leading-tight truncate">
              {description}
            </p>
          )}
        </div>
        {selectable && (
          <div
            className={cn(
              "w-4 h-4 rounded-full flex items-center justify-center border transition-all flex-shrink-0 ml-1",
              selected
                ? "bg-[var(--accent)] border-[var(--accent)] text-white scale-100"
                : "border-[var(--border)] bg-transparent opacity-40"
            )}
            aria-hidden="true"
          >
            {selected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      role={selectable ? (type === "checkbox" ? "checkbox" : "radio") : "group"}
      aria-checked={selectable ? selected : undefined}
      tabIndex={selectable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (selectable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.(e as any);
        }
      }}
      className={cn(
        "relative rounded-2xl border p-5 sm:p-6 transition-all duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] text-left",
        selectable ? "cursor-pointer select-none active:scale-[0.98]" : "",
        selected
          ? "border-[var(--accent)] bg-[var(--accent-soft)] ring-1 ring-[var(--accent)] shadow-sm"
          : "border-[var(--border-light)] bg-[var(--white)] hover:border-[var(--border)] hover:bg-[var(--off-white)]/70 shadow-[var(--shadow-subtle)] hover:shadow-[var(--shadow-default)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        {icon && (
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-xl transition-colors flex-shrink-0",
              selected
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--off-white)] text-[var(--accent)]"
            )}
          >
            {icon}
          </div>
        )}
        <div className="flex items-center gap-2 ml-auto">
          {badgeText && (
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/20">
              {badgeText}
            </span>
          )}
          {selectable && (
            <div
              className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center border transition-all flex-shrink-0",
                selected
                  ? "bg-[var(--accent)] border-[var(--accent)] text-white scale-100"
                  : "border-[var(--border)] bg-transparent opacity-40"
              )}
              aria-hidden="true"
            >
              {selected && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-base font-semibold tracking-tight text-[var(--text-1)]">
          {title}
        </h3>
        {description && (
          <p className="text-xs sm:text-sm text-[var(--text-3)] mt-1.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
