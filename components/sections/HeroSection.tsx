'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { EASE_OUT, DURATIONS } from '@/components/marketing/motion-tokens';
import { Cta } from '@/components/marketing/cta';

const JOURNEY = [
  {
    number: '01',
    title: 'Decisión diaria',
    description:
      'Apartar $0.10 al día en lugar de gastarlo sin pensar. El vuelto del bar escolar se vuelve el primer acto de control sobre tus recursos.',
  },
  {
    number: '02',
    title: 'Constancia acumulada',
    description:
      '$9.00 en 90 días de disciplina. Un fondo tangible construido sin préstamos ni deudas familiares.',
  },
  {
    number: '03',
    title: 'Insumos y prototipo',
    description:
      'Comprar materiales para tus primeros 25 productos: pulseras, stickers o separadores con coste unitario calculado.',
  },
  {
    number: '04',
    title: 'Feria escolar',
    description:
      'Vender en la feria de la Unidad Educativa Surcos, registrar ventas y reinvertir el 50% de la ganancia.',
  },
] as const;

export function HeroSection() {
  const reduce = useReducedMotion() ?? false;

  const entrance = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.2 : DURATIONS.smooth, delay, ease: EASE_OUT },
  });

  return (
    <section id="top" className="relative overflow-hidden bg-[var(--white)]">
      {/* Ambient estático (sin re-render por scroll) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[560px] pointer-events-none bg-[radial-gradient(58%_52%_at_50%_0%,var(--accent-soft),transparent_72%)] opacity-70"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            {...entrance(0)}
            className="font-serif text-[clamp(2.6rem,5.5vw,5rem)] leading-[1.06] text-[var(--text-1)] tracking-tight mb-6"
          >
            Pequeñas monedas.{' '}
            <em className="italic font-normal text-[var(--accent)]">Grandes posibilidades.</em>
          </motion.h1>

          <motion.p
            {...entrance(0.08)}
            className="text-[1.08rem] sm:text-[1.22rem] text-[var(--text-2)] max-w-2xl mx-auto leading-relaxed font-normal mb-9"
          >
            Aprende a ahorrar, convierte tus ideas en emprendimientos reales y desarrolla las
            habilidades que te ayudarán a construir tu futuro.
          </motion.p>

          <motion.div
            {...entrance(0.16)}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-7"
          >
            <Cta href="#calculadora" size="lg" className="w-full sm:w-auto">
              <span>Calcula tus ahorros</span>
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Cta>
            <Cta href="#emprendimiento" variant="ghost" size="lg" className="w-full sm:w-auto">
              Descubre cómo emprender
            </Cta>
          </motion.div>

          <motion.p
            {...entrance(0.24)}
            className="text-[0.82rem] text-[var(--text-3)] font-medium"
          >
            PYME estudiantil · Unidad Educativa Surcos · Fines pedagógicos
          </motion.p>
        </div>

        {/* Trayectoria editorial — patrón Pipeline ContaMind: 4 columnas estáticas */}
        <motion.div
          {...entrance(0.32)}
          className="max-w-6xl mx-auto mt-16 md:mt-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {JOURNEY.map((item, idx) => (
              <motion.article
                key={item.number}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduce ? 0.2 : DURATIONS.smooth,
                  delay: 0.28 + idx * 0.06,
                  ease: EASE_OUT,
                }}
                className="text-center lg:text-left"
              >
                <span
                  aria-hidden="true"
                  className="block font-serif text-[clamp(2.2rem,3.5vw,3rem)] leading-none text-[var(--text-4)] opacity-60 select-none"
                >
                  {item.number}
                </span>
                <h3 className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-[var(--text-1)] mt-4 mb-3">
                  {item.title}
                </h3>
                <p className="text-[0.95rem] leading-[1.7] text-[var(--text-2)] max-w-[28ch] mx-auto lg:mx-0">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>

          <p className="text-center text-[0.9rem] text-[var(--text-3)] leading-relaxed max-w-xl mx-auto mt-14">
            Ahorrar, emprender y aprender: tres hábitos que se entrenan con centavos
            y se usan toda la vida.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
