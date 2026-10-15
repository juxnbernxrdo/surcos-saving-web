'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SectionHeading } from '@/components/marketing/SectionHeading';
import { Input } from '@/components/ui/Input';
import { formatCurrency } from '@/lib/utils';
import { CHALLENGES, formatCents, requestSimulateChallenge } from '@/lib/savings';
import { EASE_OUT, DURATIONS } from '@/components/marketing/motion-tokens';

export function SavingsChallengesSection() {
  const reduce = useReducedMotion() ?? false;
  const [customGoalName, setCustomGoalName] = useState('Insumos para feria estudiantil');
  const [customGoalTarget, setCustomGoalTarget] = useState('25');
  const [customPace, setCustomPace] = useState('0.20');

  const targetNum = Math.max(1, parseFloat(customGoalTarget) || 0);
  const paceNum = Math.max(0.01, parseFloat(customPace) || 0.10);
  const daysNeeded = Math.ceil(targetNum / paceNum);
  const monthsNeeded = (daysNeeded / 30).toFixed(1);

  return (
    <section id="retos" className="bg-[var(--off-white)] border-b border-[var(--border-light)] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Rutas formativas"
          title={
            <>
              Cuatro retos, una sola disciplina:{' '}
              <em className="italic font-normal text-[var(--text-3)]">la constancia.</em>
            </>
          }
          subtitle="Niveles progresivos para medir tu disciplina —no compites por dinero, compites por hábitos."
        />

        {/* Tabla comparativa — filas con divisores, sin cards */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduce ? 0.2 : DURATIONS.smooth, ease: EASE_OUT }}
          className="mt-12 md:mt-16 max-w-5xl border-y border-[var(--border-light)] overflow-x-auto"
        >
          <table className="w-full text-left text-sm border-collapse min-w-[640px]">
            <thead>
              <tr className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-4)]">
                <th className="py-3 pr-4 font-semibold">Reto</th>
                <th className="py-3 px-3 text-right font-semibold">Aporte</th>
                <th className="py-3 px-3 text-right font-semibold">Plazo</th>
                <th className="py-3 px-3 text-right font-semibold">Meta</th>
                <th className="py-3 pl-4 font-semibold">Objetivo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-light)]">
              {CHALLENGES.map((c) => (
                <tr key={c.id} className="group hover:bg-[var(--white)]/60 transition-colors">
                  <td className="py-4 pr-4">
                    <span className="block font-semibold text-[var(--text-1)]">{c.name}</span>
                    <span className="block text-[0.72rem] font-semibold uppercase tracking-wider text-[var(--accent)] mt-0.5">{c.level}</span>
                  </td>
                  <td className="py-4 px-3 text-right font-mono font-bold text-[var(--accent)]">{formatCents(c.dailyCents)}</td>
                  <td className="py-4 px-3 text-right font-mono text-[var(--text-2)]">{c.days} días</td>
                  <td className="py-4 px-3 text-right font-mono font-bold text-[var(--text-1)]">{formatCents(c.goalCents)}</td>
                  <td className="py-4 pl-4 text-[0.85rem] text-[var(--text-3)] leading-relaxed max-w-[26ch]">
                    {c.objective}{' '}
                    <button
                      type="button"
                      onClick={() => requestSimulateChallenge(c.id)}
                      aria-label={`Simular ${c.name} en el simulador`}
                      className="text-[var(--accent)] font-semibold hover:text-[var(--accent-hover)] transition-colors cursor-pointer ml-1 active:scale-[0.97]"
                    >
                      Simular reto →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Reto personalizado — dos columnas editoriales, patrón Audience */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl">
          <div>
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[var(--accent)] block mb-3">
              Diseño de reto autónomo
            </span>
            <h3 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-[var(--text-1)] tracking-tight leading-[1.12] mb-4">
              Personaliza tu propia meta.
            </h3>
            <p className="text-[0.95rem] text-[var(--text-2)] leading-relaxed mb-6">
              Define tu objetivo y calcula el ritmo exacto según tu realidad económica.
            </p>
            <div className="space-y-4">
              <Input
                label="Nombre de tu meta o proyecto"
                placeholder="Ej. Kit de pintura para feria escolar"
                value={customGoalName}
                onChange={(e) => setCustomGoalName(e.target.value)}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="¿Cuánto necesitas? ($)"
                  type="number"
                  step="1"
                  min="1"
                  value={customGoalTarget}
                  onChange={(e) => setCustomGoalTarget(e.target.value)}
                  helperText="Valor de los insumos"
                />
                <Input
                  label="Aporte diario ($)"
                  type="number"
                  step="0.05"
                  min="0.01"
                  value={customPace}
                  onChange={(e) => setCustomPace(e.target.value)}
                  helperText="Monedas del vuelto"
                />
              </div>
            </div>
          </div>

          <div className="lg:pt-14">
            <div className="font-mono font-bold text-[clamp(2.4rem,5vw,3.5rem)] text-[var(--text-1)] tracking-tight leading-none">
              {daysNeeded} <span className="text-[var(--accent)] text-[0.6em] font-bold">días</span>
            </div>
            <p className="text-[0.95rem] font-semibold text-[var(--text-2)] mt-2">
              (~{monthsNeeded} meses) para {customGoalName || 'tu meta'}
            </p>
            <p className="text-[0.95rem] text-[var(--text-2)] leading-relaxed mt-3 max-w-md">
              Apartando <strong className="text-[var(--text-1)]">{formatCurrency(paceNum)}</strong> cada
              día, reunirás <strong className="text-[var(--text-1)]">{formatCurrency(targetNum)}</strong> sin
              pedir prestado.
            </p>
            <p className="text-[0.82rem] text-[var(--text-3)] mt-6 pt-6 border-t border-[var(--border-light)] leading-relaxed">
              Los retos son instrumentos pedagógicos. Surcos Saving no custodia dinero:
              cada estudiante gestiona sus monedas con su familia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
