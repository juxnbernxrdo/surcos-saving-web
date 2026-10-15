'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type CtaVariant = 'primary' | 'ghost' | 'white' | 'ghostWhite';
type CtaSize = 'sm' | 'md' | 'lg';

export interface CtaProps {
  href: string;
  variant?: CtaVariant;
  size?: CtaSize;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  'aria-label'?: string;
}

const VARIANTS: Record<CtaVariant, string> = {
  primary:
    'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] shadow-[0_4px_24px_rgba(0,113,227,0.25)] hover:shadow-[0_8px_32px_rgba(0,113,227,0.35)] hover:-translate-y-[1px]',
  ghost:
    'border border-[var(--border-light)] text-[var(--text-1)] hover:bg-[var(--off-white)] hover:border-[var(--border)]',
  white:
    'bg-[var(--white)] text-[var(--text-1)] border border-[var(--border-light)] hover:bg-[var(--off-white)] shadow-sm hover:-translate-y-[1px]',
  ghostWhite:
    'border border-[var(--border-light)] text-[var(--text-2)] hover:bg-[var(--white)] hover:text-[var(--text-1)]',
};

const SIZES: Record<CtaSize, string> = {
  sm: 'px-5 py-2.5 text-[0.88rem]',
  md: 'px-7 py-3 text-[0.95rem]',
  lg: 'px-8 py-3.5 text-[1rem]',
};

/**
 * Primitiva CTA de la landing (réplica del patrón ContaMind AI).
 * Pill redondeada, press scale 0.97, hover lift -1px.
 * Solo para navegación por ancla / enlaces principales.
 */
export function Cta({ href, variant = 'primary', size = 'md', className, children, onClick, 'aria-label': ariaLabel }: CtaProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={cn(
        'group inline-flex items-center justify-center gap-2 rounded-full font-semibold cursor-pointer select-none',
        'transition-[transform,background-color,border-color,color,box-shadow,opacity] duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]',
        'active:scale-[0.97]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--white)]',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
    >
      {children}
    </a>
  );
}
