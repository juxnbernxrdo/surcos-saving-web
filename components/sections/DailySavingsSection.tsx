'use client';

import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '@/components/marketing/SectionHeading';
import { useEntrancePresets } from '@/components/marketing/motion-tokens';
import {
  Wallet,
  CalendarCheck,
  ShieldAlert,
  ClipboardList,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';

export function DailySavingsSection() {
  const { fadeUp } = useEntrancePresets();

  const principles = [
    {
      icon: Wallet,
      title: 'Administración sobre cantidad',
      desc: 'El hábito no empieza cuando tienes mucho dinero. Empieza decidiendo qué porcentaje de lo que recibes —aunque sean centavos— destinas a un objetivo deliberado.',
    },
    {
      icon: CalendarCheck,
      title: 'El poder acumulativo de la constancia',
      desc: 'Cinco o diez centavos parecen insignificantes en un día aislado. Pero repetidos durante 90 o 180 días se transforman en una cantidad tangible que tú mismo construiste.',
    },
    {
      icon: ShieldAlert,
      title: 'Tranquilidad frente a imprevistos',
      desc: 'Contar con una pequeña reserva te permite resolver necesidades escolares imprevistas (materiales, fotocopias, transportes) sin depender de urgencias.',
    },
    {
      icon: ClipboardList,
      title: 'Registrar para decidir mejor',
      desc: 'Anotar lo que ingresa y lo que gastas en el bar o en la papelería te da visibilidad. Lo que se mide se puede planificar y mejorar.',
    },
    {
      icon: Sparkles,
      title: 'Semilla para crear valor',
      desc: 'Ahorrar no es guardar dinero para dejarlo inmóvil: es el trampolín que te permite adquirir insumos iniciales para tu primera idea de emprendimiento.',
    },
    {
      icon: HeartHandshake,
      title: 'Una herramienta adaptable a tu realidad',
      desc: 'No existe una cuota obligatoria ni una cifra perfecta. Cada estudiante avanza a su propio ritmo según sus circunstancias personales y familiares.',
    },
  ];

  return (
    <section id="ahorro" className="py-20 md:py-28 border-b border-[var(--border-light)] bg-[var(--white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="El hábito fundamental"
          eyebrowIcon={<Wallet className="w-3.5 h-3.5" />}
          title="El poder de empezar con el vuelto diario"
          subtitle="Cada moneda que vuelve del bar estudiantil puede gastarse sin pensar o transformarse en una lección de disciplina que te acompañará toda la vida."
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="rounded-2xl border border-[var(--border-light)] bg-[var(--white)] p-6 sm:p-7 shadow-[var(--shadow-subtle)] hover:shadow-[var(--shadow-default)] hover:border-[var(--border)] transition-all duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-[var(--text-1)] tracking-tight mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-2)] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Empathy & Ethical Note Banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 max-w-3xl mx-auto rounded-2xl bg-[var(--off-white)] border border-[var(--border-light)] p-5 text-center text-xs sm:text-sm text-[var(--text-3)] leading-relaxed"
        >
          <strong className="text-[var(--text-1)] font-semibold">Compromiso pedagógico: </strong>
          En Surcos Saving nunca juzgamos ni culpabilizamos a quienes no tienen posibilidades de ahorrar en un momento dado. Nuestro enfoque es 100% formativo: enseñar los principios de gestión para cuando los recursos estén disponibles.
        </motion.div>
      </div>
    </section>
  );
}
