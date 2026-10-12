'use client';

import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: number;
}

export const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  (
    {
      className,
      onClick,
      disabled,
      'aria-label': ariaLabel = 'Cerrar',
      size = 15,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-lg text-[var(--text-3)] hover:text-[var(--text-1)] hover:bg-[var(--off-white)] border border-[var(--border-light)] shadow-xs transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] active:scale-95 disabled:opacity-40 disabled:pointer-events-none',
          className,
        )}
        {...props}
      >
        <X size={size} />
      </button>
    );
  },
);

CloseButton.displayName = 'CloseButton';
