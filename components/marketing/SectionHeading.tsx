'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useEntrancePresets } from './motion-tokens';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  eyebrowIcon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Sección heading consistente: label + título serif + subtítulo.
 * Réplica del patrón ContaMind AI: eyebrow de texto plano (sin pill),
 * reveal on scroll (once) con fallback reduced-motion (solo opacidad).
 */
export function SectionHeading({
  eyebrow,
  eyebrowIcon,
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const { fadeUp } = useEntrancePresets();

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}
    >
      {eyebrow && (
        <div
          className={cn(
            'flex items-center gap-1.5 mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[var(--accent)]',
            align === 'center' && 'justify-center'
          )}
        >
          {eyebrowIcon}
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="font-serif text-[clamp(1.9rem,3.5vw,2.9rem)] text-[var(--text-1)] tracking-tight leading-[1.12] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[1.05rem] text-[var(--text-2)] leading-relaxed font-normal">{subtitle}</p>
      )}
    </motion.div>
  );
}
