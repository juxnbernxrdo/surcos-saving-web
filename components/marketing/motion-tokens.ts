/**
 * Surcos Saving Motion Tokens
 * Enforcing Emil Kowalski's Animation Philosophy & Guidelines:
 *
 * 1. Easing: Strong custom ease-out (0.23, 1, 0.32, 1) for immediate feedback.
 * 2. Timing: UI animations stay under 300ms (fast 160ms, normal 250ms).
 * 3. Entrance: Scale from 0.96 with opacity 0 (Never scale(0)).
 * 4. Active Press: scale(0.97) on click/tap for responsive tactile feel.
 * 5. Hardware acceleration: Only animate `transform` and `opacity`.
 * 6. Accessibility: every movement preset has a reduced-motion fallback.
 */

import { useReducedMotion, type Variants } from 'motion/react';

export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;

export const DURATIONS = {
  instant: 0.1,
  fast: 0.16,
  normal: 0.25,
  smooth: 0.35,
  slow: 0.5,
};

// Press state scale for buttons & card triggers
export const PRESS_SCALE = 0.97;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: DURATIONS.smooth,
      ease: EASE_OUT,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATIONS.normal,
      ease: EASE_OUT,
    },
  },
};

export const staggerContainer = (staggerDelay = 0.05): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.04,
    },
  },
});

export interface EntrancePresets {
  reduce: boolean;
  fadeUp: Variants;
  fade: Variants;
}

export function useEntrancePresets(): EntrancePresets {
  const reduce = useReducedMotion() ?? false;
  const duration = reduce ? 0.15 : DURATIONS.smooth;
  const fadeUp: Variants = {
    hidden: { opacity: 0, ...(reduce ? {} : { y: 16, scale: 0.98 }) },
    visible: {
      opacity: 1,
      ...(reduce ? {} : { y: 0, scale: 1 }),
      transition: { duration, ease: EASE_OUT },
    },
  };
  const fade: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: reduce ? 0.12 : DURATIONS.normal, ease: EASE_OUT },
    },
  };
  return { reduce, fadeUp, fade };
}
