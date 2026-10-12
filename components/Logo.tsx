'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  height?: number;
  priority?: boolean;
}

/**
 * Logo - Renders the official Surcos Saving horizontal SVG
 * Preserves the original SVG without distortion or modification.
 * Applies crisp-edges and theme-aware contrast (dark:invert).
 */
export function Logo({
  className,
  height = 36,
  priority = true,
}: LogoProps) {
  // Original SVG viewBox: 0 0 748 166 => aspect ratio 748 / 166 (~4.506)
  const width = Math.round(height * (748 / 166));

  return (
    <img
      src="/Logo-Horizontal.svg"
      alt="Surcos Saving"
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      style={{
        height: `${height}px`,
        width: `${width}px`,
        aspectRatio: '748 / 166',
        imageRendering: 'crisp-edges',
      }}
      className={cn(
        'block select-none transition-opacity duration-150',
        // In dark mode, invert the black SVG paths so they are crisp white
        'dark:invert dark:brightness-200',
        className
      )}
    />
  );
}
