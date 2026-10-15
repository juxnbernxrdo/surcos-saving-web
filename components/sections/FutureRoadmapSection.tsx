'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '@/components/marketing/SectionHeading';
import { EASE_OUT } from '@/components/marketing/motion-tokens';
import { ChevronDown, ShieldCheck, Medal, UsersRound, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type RoadmapFilter = 'all' | 'in_progress' | 'upcoming' | 'proposal';

interface RoadmapItem {
  id: string;
  title: string;
  category: string;
  status: string;
  filterGroup: Exclude<RoadmapFilter, 'all'>;
  scope: string;
  horizon: string;
  desc: string;
  pedagogicalGoal: string;
}

const COMMITMENTS = [
  { icon: ShieldCheck, title: 'Cero custodia', desc: 'Sin depósitos ni retención de dinero. Actividad 100% pedagógica.' },
  { icon: Medal, title: 'Hábito sobre monto', desc: 'Premiamos perseverancia y registro, nunca la cantidad.' },
  { icon: UsersRound, title: 'Inclusión total', desc: 'Cualquier estudiante participa desde centavos de dólar.' },
  { icon: Sparkles, title: 'Comunidad Surcos', desc: 'Articulado con ferias, aulas y respaldo familiar.' },
];

const ROADMAP_ITEMS: RoadmapItem[] = [
  { id: 'retos-grupales', title: 'Retos grupales e inter-aulas', category: 'Comunidad y hábitos', status: 'En desarrollo', filterGroup: 'in_progress', scope: 'Básica Superior y Bachillerato', horizon: 'II Quimestre 2026', desc: 'Dinámicas entre paralelos para fomentar la constancia colectiva: no compite quién tiene más dinero, sino quién mantiene el registro diario.', pedagogicalGoal: 'Apoyo mutuo y compromiso colectivo.' },
  { id: 'hojas-imprimibles', title: 'Hojas imprimibles de seguimiento', category: 'Herramientas físicas', status: 'Próximamente', filterGroup: 'upcoming', scope: 'Toda la comunidad', horizon: 'Próximo periodo lectivo', desc: 'Plantillas descargables para registrar ingresos, gastos y metas pegadas en el cuaderno o la habitación.', pedagogicalGoal: 'Contacto físico continuo con las finanzas desde edades tempranas.' },
  { id: 'talleres-precios', title: 'Talleres de precios y márgenes', category: 'Formación práctica', status: 'En desarrollo', filterGroup: 'in_progress', scope: 'Emprendedores de ferias', horizon: 'Previo a cada feria', desc: 'Sesiones presenciales para calcular costes exactos, margen neto y precio justo al público.', pedagogicalGoal: 'Evitar la venta a pérdida; distinguir ingreso bruto de ganancia neta.' },
  { id: 'mentorias-escolares', title: 'Mentorías entre pares', category: 'Liderazgo estudiantil', status: 'Propuesta', filterGroup: 'proposal', scope: 'Mayores con básica', horizon: 'En consulta institucional', desc: 'Alumnos de cursos superiores orientan a los más jóvenes en diseño y viabilidad de productos.', pedagogicalGoal: 'Liderazgo y transmisión intergeneracional.' },
  { id: 'taller-web', title: 'Mi primera web o catálogo digital', category: 'Tecnología y código', status: 'Propuesta', filterGroup: 'proposal', scope: 'Bachillerato y clubes', horizon: 'En diseño de temario', desc: 'HTML, CSS y diseño web para publicar un catálogo digital sin intermediarios.', pedagogicalGoal: 'Conectar programación con economía real.' },
  { id: 'guias-familias', title: 'Materiales para familias', category: 'Entorno familiar', status: 'En desarrollo', filterGroup: 'in_progress', scope: 'Padres y tutores', horizon: 'Próximas reuniones', desc: 'Orientaciones para acompañar hábitos de ahorro sin imponer presión.', pedagogicalGoal: 'Armonizar aula y hogar.' },
  { id: 'reconocimiento-constancia', title: 'Reconocimientos a la constancia', category: 'Ética y mérito', status: 'En evaluación', filterGroup: 'proposal', scope: 'Participantes comprometidos', horizon: 'Cierre lectivo', desc: 'Menciones al rigor y la ética de servicio, nunca al monto acumulado.', pedagogicalGoal: 'Consistencia e integridad sobre ventaja socioeconómica.' },
];

const FILTERS: { id: RoadmapFilter; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'in_progress', label: 'En desarrollo' },
  { id: 'upcoming', label: 'Próximamente' },
  { id: 'proposal', label: 'Propuestas' },
];

export function FutureRoadmapSection() {
  const [filter, setFilter] = useState<RoadmapFilter>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredItems = ROADMAP_ITEMS.filter((item) => filter === 'all' || item.filterGroup === filter);
  const toggleExpand = (id: string) => setExpandedId((curr) => (curr === id ? null : id));

  return (
    <section id="vision" className="bg-[var(--white)] py-20 md:py-28 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Visión"
          title={
            <>
              Hacia dónde evoluciona{' '}
              <em className="italic font-normal text-[var(--text-3)]">Surcos Saving.</em>
            </>
          }
          subtitle="Una iniciativa viva que crece con la comunidad. Estado real, horizonte y propósito de cada proyecto."
        />

        {/* Compromisos — patrón SecurityStrip: fila sobria con iconos pequeños */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 md:mt-16 pb-12 border-b border-[var(--border-light)]">
          {COMMITMENTS.map((c) => (
            <li key={c.title} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center shrink-0">
                <c.icon size={16} className="text-[var(--accent)]" />
              </div>
              <div>
                <span className="block text-[0.88rem] font-semibold text-[var(--text-1)]">{c.title}</span>
                <span className="block text-[0.8rem] text-[var(--text-3)] leading-relaxed mt-0.5">{c.desc}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* Filtro — texto plano con indicador deslizante animado */}
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-b border-[var(--border-light)]">
          {FILTERS.map((f) => {
            const isSelected = filter === f.id;
            const count = f.id === 'all' ? ROADMAP_ITEMS.length : ROADMAP_ITEMS.filter((i) => i.filterGroup === f.id).length;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={isSelected}
                className={cn(
                  'relative pb-3 text-[0.9rem] font-semibold transition-colors cursor-pointer -mb-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-t-sm active:scale-[0.98]',
                  isSelected ? 'text-[var(--accent)]' : 'text-[var(--text-3)] hover:text-[var(--text-1)]'
                )}
              >
                {f.label} ({count})
                {isSelected && (
                  <motion.span
                    layoutId="roadmapFilterIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Matriz — filas con divisores */}
        <div className="divide-y divide-[var(--border-light)]">
          {filteredItems.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  aria-expanded={isExpanded}
                  className="w-full py-5 grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-6 lg:items-baseline text-left cursor-pointer group"
                >
                  <span className="lg:col-span-5">
                    <span className="block text-[0.72rem] font-semibold uppercase tracking-wider text-[var(--accent)] mb-1">{item.category}</span>
                    <span className="text-[1rem] font-semibold text-[var(--text-1)] group-hover:text-[var(--accent)] transition-colors">{item.title}</span>
                  </span>
                  <span className="lg:col-span-2 text-[0.85rem] text-[var(--text-2)]">{item.status}</span>
                  <span className="lg:col-span-2 text-[0.85rem] text-[var(--text-3)]">{item.scope}</span>
                  <span className="lg:col-span-2 text-[0.85rem] text-[var(--text-3)]">{item.horizon}</span>
                  <span className="lg:col-span-1 flex lg:justify-end">
                    <span className={cn('inline-flex w-7 h-7 rounded-full border border-[var(--border-light)] items-center justify-center text-[var(--text-3)] transition-transform duration-200', isExpanded && 'rotate-180 text-[var(--accent)]')}>
                      <ChevronDown size={15} />
                    </span>
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
                      <div className="pb-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
                        <p className="lg:col-span-7 text-[0.92rem] text-[var(--text-2)] leading-relaxed">{item.desc}</p>
                        <p className="lg:col-span-5 text-[0.85rem] text-[var(--text-3)] leading-relaxed">
                          <strong className="text-[var(--text-1)] font-semibold">Propósito: </strong>
                          {item.pedagogicalGoal}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[0.9rem] text-[var(--text-3)] leading-relaxed max-w-xl mx-auto mt-16">
          Surcos Saving es una PYME estudiantil con propósito pedagógico. No recibe depósitos,
          no custodia fondos ni promete rentabilidad. Los recursos permanecen con el
          estudiante y su familia.
        </p>
      </div>
    </section>
  );
}
