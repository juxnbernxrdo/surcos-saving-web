'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useEntrancePresets } from '@/components/marketing/motion-tokens';

const CREDENTIALS = [
  'Desarrollador de software desde los 13 años',
  'Formación complementaria: programas como CS50 (Harvard / MIT)',
  'Iniciativa formativa vinculada a la Unidad Educativa Surcos',
] as const;

export function CeoSection() {
  const { fadeUp } = useEntrancePresets();

  return (
    <section id="nosotros" className="bg-[var(--off-white)] border-b border-[var(--border-light)] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-2"
          >
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[var(--accent)] block mb-3">
              Liderazgo estudiantil
            </span>
            <h3 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-[var(--text-1)] tracking-tight leading-[1.12] mb-4">
              Juan Bernardo Ordóñez.
            </h3>
            <p className="text-[0.95rem] text-[var(--text-2)] leading-relaxed mb-2">
              CEO e impulsor de Surcos Saving.
            </p>
            <p className="text-[0.85rem] text-[var(--text-3)] leading-relaxed">
              Quito, Ecuador · Unidad Educativa Surcos
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-3"
          >
            <p className="text-[1.05rem] text-[var(--text-2)] leading-relaxed mb-8">
              Desarrollador de software desde los 13 años, con interés en tecnología,
              educación y emprendimiento. Su visión: ayudar a los estudiantes a crear
              hábitos financieros y convertir sus ideas en oportunidades reales.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {CREDENTIALS.map((c) => (
                <span key={c} className="text-[0.8rem] text-[var(--text-3)] flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--accent)]/50 shrink-0" />
                  {c}
                </span>
              ))}
            </div>
            <p className="text-[0.82rem] text-[var(--text-4)] mt-8 pt-6 border-t border-[var(--border-light)]">
              Nota de transparencia: formación académica y tecnológica según certificaciones acreditables.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
