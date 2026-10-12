'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useEntrancePresets, EASE_OUT } from '@/components/marketing/motion-tokens';
import {
  Coins,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShoppingBag,
  GraduationCap,
  CheckCircle2,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export function HeroSection() {
  const { fadeUp, fade } = useEntrancePresets();
  const [activeStep, setActiveStep] = useState<number>(0);

  const journeySteps = [
    {
      label: '1. Tu decisión diaria',
      badge: 'Hábito',
      amount: '$0.10 al día',
      desc: 'Guardar el vuelto del bar en lugar de gastarlo sin darte cuenta.',
      metric: 'Esfuerzo mínimo',
      icon: Coins,
      tag: 'Ahorro',
    },
    {
      label: '2. Acumulación constante',
      badge: '30 a 90 días',
      amount: '$9.00 ahorrados',
      desc: 'Sin deudas ni préstamos. Tienes tu primer fondo propio.',
      metric: 'Disciplina real',
      icon: TrendingUp,
      tag: 'Constancia',
    },
    {
      label: '3. Creación del producto',
      badge: 'Insumos',
      amount: 'Materiales listos',
      desc: 'Comprar materiales para stickers, pulseras o papelería escolar.',
      metric: 'De la idea al objeto',
      icon: ShoppingBag,
      tag: 'Emprendimiento',
    },
    {
      label: '4. Venta en feria escolar',
      badge: 'Feria presencial',
      amount: 'Resultados y margen',
      desc: 'Presentar tu producto con autorización y recuperar tu inversión con ganancia.',
      metric: 'Habilidad de por vida',
      icon: GraduationCap,
      tag: 'Formación',
    },
  ];

  return (
    <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 md:pb-24 border-b border-[var(--border-light)]">
      {/* Ambient Radial Diffuse Gradient */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(58%_52%_at_50%_0%,var(--accent-soft),transparent_72%)]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Eyebrow Pill */}
        <motion.div
          variants={fade}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-5"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--white)] border border-[var(--border)] shadow-xs select-none">
            <span className="flex h-2 w-2 rounded-full bg-[var(--green)] animate-pulse" />
            <span className="text-xs font-medium text-[var(--text-2)]">
              Comunidad Educativa Unidad Educativa Surcos
            </span>
            <span className="text-[var(--border)]">|</span>
            <span className="text-xs font-semibold text-[var(--accent)] flex items-center gap-1">
              PYME Estudiantil <Sparkles className="w-3 h-3" />
            </span>
          </div>
        </motion.div>

        {/* Hero Title and Copy */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="font-serif text-[clamp(2.6rem,5.5vw,5rem)] text-[var(--text-1)] tracking-tight leading-[1.06] mb-6">
            Pequeñas monedas.{' '}
            <span className="italic font-normal text-[var(--accent)]">
              Grandes posibilidades.
            </span>
          </h1>

          <p className="font-sans text-[1.1rem] sm:text-[1.28rem] text-[var(--text-2)] leading-relaxed max-w-2xl mx-auto mb-9 font-normal">
            Aprende a ahorrar, convierte tus ideas en emprendimientos reales y desarrolla las
            habilidades que te ayudarán a construir tu futuro.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
            <Button
              size="lg"
              variant="primary"
              className="w-full sm:w-auto text-[14px]"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => {
                const el = document.querySelector('#calculadora');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Calcula tus ahorros
            </Button>

            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto text-[14px]"
              onClick={() => {
                const el = document.querySelector('#emprendimiento');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Descubre cómo emprender
            </Button>
          </div>
        </motion.div>

        {/* Interactive Milestone Progression (Not generic fintech, but the tangible Surcos journey) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto rounded-3xl border border-[var(--border)] bg-[var(--white)] shadow-[var(--shadow-default)] p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-light)]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-3)] block mb-1">
                La ruta de Surcos Saving
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[var(--text-1)] font-normal">
                Cómo una moneda de diez centavos se convierte en un proyecto
              </h3>
            </div>
            <div className="flex items-center gap-1.5 bg-[var(--off-white)] p-1 rounded-full border border-[var(--border-light)] self-start sm:self-auto">
              {journeySteps.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-150 cursor-pointer ${
                    activeStep === idx
                      ? 'bg-[var(--white)] text-[var(--accent)] shadow-xs ring-1 ring-black/5'
                      : 'text-[var(--text-3)] hover:text-[var(--text-1)]'
                  }`}
                >
                  Paso {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Content */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 mb-3">
                <Badge variant="accent" size="sm">
                  {journeySteps[activeStep].tag}
                </Badge>
                <span className="text-xs text-[var(--text-3)] font-mono">
                  {journeySteps[activeStep].badge}
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-semibold text-[var(--text-1)] tracking-tight mb-2">
                {journeySteps[activeStep].label}
              </h4>
              <p className="text-sm sm:text-base text-[var(--text-2)] leading-relaxed mb-4">
                {journeySteps[activeStep].desc}
              </p>
              <div className="flex items-center gap-2 text-xs text-[var(--text-3)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--green)] stroke-[2.5]" />
                <span>Impacto formativo: <strong>{journeySteps[activeStep].metric}</strong></span>
              </div>
            </div>

            <div className="md:col-span-5 bg-[var(--off-white)] rounded-2xl p-5 border border-[var(--border-light)] flex flex-col justify-center items-center text-center">
              {React.createElement(journeySteps[activeStep].icon, {
                className: 'w-10 h-10 text-[var(--accent)] mb-3 stroke-[1.8]',
              })}
              <div className="font-mono text-2xl font-bold text-[var(--text-1)] tracking-tight mb-1">
                {journeySteps[activeStep].amount}
              </div>
              <p className="text-xs text-[var(--text-3)]">
                Etapa {activeStep + 1} de 4 en la formación del estudiante
              </p>
            </div>
          </div>
        </motion.div>

        {/* 3 Pillars Summary Bar */}
        <motion.div
          variants={fade}
          initial="hidden"
          animate="visible"
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          <div className="p-4 rounded-2xl border border-[var(--border-light)] bg-[var(--white)] flex items-center gap-3.5 shadow-2xs">
            <div className="w-9 h-9 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center flex-shrink-0">
              <Coins className="w-4.5 h-4.5 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-1)]">
                1. Ahorrar
              </h4>
              <p className="text-xs text-[var(--text-3)]">
                Aprender a administrar pequeños montos con disciplina.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-[var(--border-light)] bg-[var(--white)] flex items-center gap-3.5 shadow-2xs">
            <div className="w-9 h-9 rounded-full bg-[var(--green-soft)] text-[var(--green)] flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-4.5 h-4.5 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-1)]">
                2. Emprender
              </h4>
              <p className="text-xs text-[var(--text-3)]">
                Crear productos y participar en ferias presenciales autorizadas.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-[var(--border-light)] bg-[var(--white)] flex items-center gap-3.5 shadow-2xs">
            <div className="w-9 h-9 rounded-full bg-[var(--amber-soft)] text-[var(--amber)] flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-4.5 h-4.5 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-1)]">
                3. Aprender
              </h4>
              <p className="text-xs text-[var(--text-3)]">
                Habilidades tecnológicas, financieras y de pensamiento crítico.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
