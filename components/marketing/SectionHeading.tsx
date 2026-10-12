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
 * SectionHeading - Standard editorial section heading (label + serif heading + body text).
 * Implements subtle Emil Kowalski scroll-reveal with reduced-motion fallback.
 */
export function SectionHeading({
  eyebrow,
  eyebrowIcon,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const { fadeUp } = useEntrancePresets();

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}
    >
      {eyebrow && (
        <div
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[var(--accent)] bg-[var(--accent-soft)] border border-[var(--accent)]/15 select-none',
            align === 'center' && 'justify-center'
          )}
        >
          {eyebrowIcon}
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="font-serif text-[clamp(2rem,3.6vw,3rem)] text-[var(--text-1)] tracking-tight leading-[1.14] mb-3.5">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[1rem] sm:text-[1.08rem] text-[var(--text-3)] leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
