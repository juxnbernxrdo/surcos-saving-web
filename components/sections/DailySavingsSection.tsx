'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '@/components/marketing/SectionHeading';
import { useEntrancePresets, EASE_OUT } from '@/components/marketing/motion-tokens';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DailySavingsSection() {
  const { fadeUp } = useEntrancePresets();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const principles = [
    {
      num: '01',
      title: 'Administración sobre cantidad',
      short: 'El hábito no empieza cuando tienes mucho dinero; empieza decidiendo qué porcentaje de lo que recibes tiene un propósito.',
      details: 'Quien no aprende a gestionar diez centavos tampoco sabrá administrar cien dólares. La disciplina financiera se entrena a escala pequeña.',
    },
    {
      num: '02',
      title: 'El poder acumulativo de la constancia',
      short: 'Una moneda diaria parece irrelevante en un día aislado. Multiplicada por 90 o 180 días se transforma en capital propio.',
      details: 'Al cabo de un trimestre escolar, una reserva diaria de 10 o 25 centavos permite cubrir materiales o financiar una idea sin pedir prestado.',
    },
    {
      num: '03',
      title: 'Tranquilidad frente a imprevistos',
      short: 'Afrontar gastos escolares espontáneos —impresiones, materiales, transporte— con serenidad y autonomía.',
      details: 'Tener una pequeña reserva personal evita la angustia de última hora y fomenta la responsabilidad individual.',
    },
    {
      num: '04',
      title: 'Registrar para decidir mejor',
      short: 'Anotar lo que ingresa y lo que gastas te otorga control sobre tus elecciones.',
      details: 'Cuando apuntas durante dos semanas en qué se va el vuelto del bar, descubres fugas invisibles. Lo que se registra se puede optimizar.',
    },
    {
      num: '05',
      title: 'Semilla para financiar proyectos',
      short: 'El ahorro no es inmovilizar dinero: es el primer peldaño para comprar insumos y emprender.',
      details: 'El capital para las ferias de Surcos Saving nace de tu propia constancia: comprar materiales, calcular precios y vender tus creaciones.',
    },
  ];

  const reveal = (delay = 0) => ({
    variants: fadeUp,
    initial: 'hidden' as const,
    whileInView: 'visible' as const,
    viewport: { once: true, amount: 0.2 } as const,
    transition: { duration: 0.45, ease: EASE_OUT, delay },
  });

  return (
    <section id="ahorro" className="bg-[var(--off-white)] border-y border-[var(--border-light)] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="El hábito"
              title={
                <>
                  La microeconomía del{' '}
                  <em className="italic font-normal text-[var(--text-3)]">vuelto escolar.</em>
                </>
              }
              subtitle="Cada día, en los pasillos y en el bar de la Unidad Educativa Surcos, circulan pequeñas monedas. Surcos Saving las convierte en el laboratorio de aprendizaje más accesible."
            />
            <motion.div
              {...reveal(0.1)}
              className="mt-10 pt-8 border-t border-[var(--border-light)]"
            >
              <p className="border-l-2 border-[var(--accent)] pl-4 py-1 italic text-[var(--text-1)] text-[0.95rem] leading-relaxed">
                «El ahorro no depende de cuánto recibes, sino de cómo administras lo que tienes.»
              </p>
              <p className="text-[0.82rem] text-[var(--text-3)] leading-relaxed mt-6">
                Adaptamos los retos a las posibilidades de cada familia. Jamás excluimos a
                quienes enfrentan dificultades económicas; enseñamos la mentalidad de gestión
                para cuando los recursos estén disponibles.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <ol className="divide-y divide-[var(--border-light)]">
              {principles.map((item, idx) => {
                const isExpanded = expandedIndex === idx;
                return (
                  <motion.li
                    key={item.num}
                    {...reveal(idx * 0.05)}
                    className="py-6 first:pt-0 last:pb-0"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                      aria-expanded={isExpanded}
                      className="w-full flex items-start gap-5 sm:gap-8 text-left cursor-pointer group"
                    >
                      <span className="font-serif text-[1.6rem] text-[var(--text-4)] leading-none pt-1 shrink-0">
                        {item.num}
                      </span>
                      <span className="flex-1">
                        <span
                          className={cn(
                            'font-sans text-[1.05rem] font-semibold mb-1.5 block transition-colors',
                            isExpanded ? 'text-[var(--accent)]' : 'text-[var(--text-1)] group-hover:text-[var(--accent)]'
                          )}
                        >
                          {item.title}
                        </span>
                        <span className="text-[0.95rem] text-[var(--text-3)] leading-relaxed block max-w-xl">
                          {item.short}
                        </span>
                      </span>
                      <span
                        className={cn(
                          'w-7 h-7 rounded-full flex items-center justify-center border border-[var(--border-light)] text-[var(--text-3)] transition-transform duration-200 shrink-0 mt-1',
                          isExpanded && 'rotate-180 text-[var(--accent)]'
                        )}
                      >
                        <ChevronDown size={15} />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2, ease: EASE_OUT }}
                          className="overflow-hidden"
                        >
                          <p className="pl-[3.25rem] sm:pl-[4rem] pt-3 pr-4 text-[0.95rem] text-[var(--text-2)] leading-relaxed max-w-xl">
                            {item.details}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
