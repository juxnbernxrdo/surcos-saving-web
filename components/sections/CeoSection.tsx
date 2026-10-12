'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/Badge';
import { useEntrancePresets } from '@/components/marketing/motion-tokens';
import { UserCheck, Code, Award, GraduationCap } from 'lucide-react';

export function CeoSection() {
  const { fadeUp } = useEntrancePresets();

  return (
    <section id="nosotros" className="py-20 md:py-24 border-b border-[var(--border-light)] bg-[var(--white)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-3xl border border-[var(--border)] bg-[var(--white)] p-6 sm:p-10 shadow-[var(--shadow-subtle)]"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-[var(--border-light)]">
            <div className="w-16 h-16 rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center flex-shrink-0 font-serif text-2xl font-bold border border-[var(--accent)]/20">
              JB
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="accent" size="sm">
                  Liderazgo estudiantil
                </Badge>
                <span className="text-xs text-[var(--text-3)]">
                  Unidad Educativa Surcos
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[var(--text-1)]">
                Juan Bernardo Ordóñez
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-3)] font-medium">
                CEO e impulsor de Surcos Saving
              </p>
            </div>
          </div>

          <div className="pt-6 space-y-4">
            <p className="text-sm sm:text-base text-[var(--text-2)] leading-relaxed">
              Juan Bernardo Ordóñez es desarrollador de software desde los 13 años y cuenta con formación complementaria mediante cursos de instituciones como Harvard y MIT, incluidos programas como CS50, según las certificaciones que pueda acreditar. Su interés por la tecnología, la educación y el emprendimiento impulsa la visión de Surcos Saving: ayudar a los estudiantes a desarrollar hábitos financieros y convertir sus ideas en oportunidades reales.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              <div className="p-3.5 rounded-xl bg-[var(--off-white)] border border-[var(--border-light)] flex items-center gap-2.5">
                <Code className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
                <span className="text-xs text-[var(--text-2)] font-medium">Desarrollo y código</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[var(--off-white)] border border-[var(--border-light)] flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
                <span className="text-xs text-[var(--text-2)] font-medium">Programas como CS50</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[var(--off-white)] border border-[var(--border-light)] flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
                <span className="text-xs text-[var(--text-2)] font-medium">Enfoque formativo y PYME</span>
              </div>
            </div>

            <p className="text-[11px] text-[var(--text-4)] pt-3 border-t border-[var(--border-light)]">
              Nota de transparencia: Las credenciales y cursos corresponden a programas de formación académica y tecnológica certificados. Surcos Saving es una iniciativa formativa orientada a la comunidad educativa.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
