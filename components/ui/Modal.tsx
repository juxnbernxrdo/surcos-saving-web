'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { CloseButton } from './CloseButton';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

const sizeClasses: Record<ModalSize, string> = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
  xl: 'sm:max-w-3xl',
};

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  size?: ModalSize;
  className?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  icon,
  size = 'md',
  className,
  children,
  footer,
  closeOnBackdrop = true,
  closeOnEsc = true,
}: ModalProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const modalRef = useRef<HTMLDivElement>(null);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Esc handling
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeOnBackdrop ? onClose : undefined}
            className="fixed inset-0 bg-black/40 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card - starts from 0.96 scale, never scale(0) */}
          <motion.div
            ref={modalRef}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className={cn(
              'relative w-full rounded-2xl border border-[var(--border-light)] bg-[var(--white)] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]',
              sizeClasses[size],
              className
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5 sm:p-6 border-b border-[var(--border-light)]">
              <div className="flex items-center gap-3">
                {icon && (
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex-shrink-0">
                    {icon}
                  </div>
                )}
                <div>
                  <h2 id="modal-title" className="font-serif text-xl sm:text-2xl font-normal text-[var(--text-1)]">
                    {title}
                  </h2>
                  {description && (
                    <p className="text-xs sm:text-sm text-[var(--text-3)] mt-0.5 font-sans">
                      {description}
                    </p>
                  )}
                </div>
              </div>
              <CloseButton onClick={onClose} aria-label="Cerrar ventana" />
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1 font-sans">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="p-4 sm:p-5 border-t border-[var(--border-light)] bg-[var(--off-white)]/40 flex items-center justify-end gap-3 font-sans">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
