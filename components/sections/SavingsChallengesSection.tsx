'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '@/components/marketing/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { useEntrancePresets } from '@/components/marketing/motion-tokens';
import { formatCurrency } from '@/lib/utils';
import {
  Target,
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle,
  HelpCircle,
  Sliders,
} from 'lucide-react';

export function SavingsChallengesSection() {
  const { fadeUp } = useEntrancePresets();
  const [modalOpen, setModalOpen] = useState(false);
  const [customGoalName, setCustomGoalName] = useState('');
  const [customGoalTarget, setCustomGoalTarget] = useState('20');
  const [customPace, setCustomPace] = useState('0.15');

  const challenges = [
    {
      id: '5c',
      name: 'Reto de 5 centavos',
      tag: 'El primer paso',
      badgeVariant: 'accent' as const,
      daily: 0.05,
      days: 30,
      total: 1.50,
      objective: 'Comenzar con una cantidad pequeña y derribar el mito de que se necesita mucho dinero para ahorrar.',
      idealFor: 'Comprar materiales o útiles básicos de dibujo para clases.',
    },
    {
      id: '10c',
      name: 'Reto de 10 centavos',
      tag: 'Crear constancia',
      badgeVariant: 'success' as const,
      daily: 0.10,
      days: 90,
      total: 9.00,
      objective: 'Construir el hábito de la disciplina diaria a lo largo de un trimestre escolar completo.',
      idealFor: 'Herramientas escolares personales y primeras muestras de producto.',
    },
    {
      id: '25c',
      name: 'Reto de 25 centavos',
      tag: 'Meta con propósito',
      badgeVariant: 'warning' as const,
      daily: 0.25,
      days: 180,
      total: 45.00,
      objective: 'Aprender a planificar con anticipación para una meta específica de mediano plazo.',
      idealFor: 'Materiales, empaques y stock inicial para una mesa en la feria escolar.',
    },
    {
      id: '50c',
      name: 'Reto de 50 centavos',
      tag: 'Capital inicial',
      badgeVariant: 'default' as const,
      daily: 0.50,
      days: 365,
      total: 182.50,
      objective: 'Planificar una inversión estudiantil seria o reunir capital de trabajo para una idea de negocio.',
      idealFor: 'Herramientas de trabajo, software/dominio o producción para varias ferias.',
    },
  ];

  // Custom goal calculations
  const targetNum = Math.max(1, parseFloat(customGoalTarget) || 0);
  const paceNum = Math.max(0.01, parseFloat(customPace) || 0.10);
  const daysNeeded = Math.ceil(targetNum / paceNum);
  const monthsNeeded = (daysNeeded / 30).toFixed(1);

  return (
    <section className="py-20 md:py-28 border-b border-[var(--border-light)] bg-[var(--white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Catálogo formativo"
          eyebrowIcon={<Target className="w-3.5 h-3.5" />}
          title="Planes y retos de ahorro educativo"
          subtitle="Rutas estructuradas para que cada estudiante ponga a prueba su constancia, aprenda a postergar la gratificación y alcance una meta concreta."
          align="center"
        />

        {/* Challenges Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((c) => (
            <motion.div
              key={c.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="rounded-2xl border border-[var(--border-light)] bg-[var(--white)] p-6 flex flex-col justify-between shadow-[var(--shadow-subtle)] hover:shadow-[var(--shadow-default)] hover:border-[var(--border)] transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant={c.badgeVariant} size="sm">
                    {c.tag}
                  </Badge>
                  <span className="text-xs text-[var(--text-3)] font-mono">
                    {c.days} días
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[var(--text-1)] tracking-tight mb-2">
                  {c.name}
                </h3>

                <div className="mb-4 pb-4 border-b border-[var(--border-light)]">
                  <div className="text-xs text-[var(--text-3)]">Aporte diario de referencia</div>
                  <div className="font-mono text-xl font-bold text-[var(--accent)]">
                    {formatCurrency(c.daily)} <span className="text-xs font-normal text-[var(--text-3)]">/ día</span>
                  </div>
                  <div className="text-xs text-[var(--text-3)] mt-1">
                    Meta acumulada estimada: <strong className="font-mono text-[var(--text-1)]">{formatCurrency(c.total)}</strong>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-3)] mb-1">
                      Objetivo formativo
                    </h4>
                    <p className="text-xs text-[var(--text-2)] leading-relaxed">
                      {c.objective}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--green)] mb-1">
                      Ejemplo de aplicación
                    </h4>
                    <p className="text-xs text-[var(--text-2)] leading-relaxed">
                      {c.idealFor}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => {
                  const calc = document.querySelector('#calculadora');
                  if (calc) calc.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Simular en calculadora
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Custom Goal Banner & Action */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 rounded-3xl border border-[var(--border)] bg-[var(--off-white)] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-2">
              <Compass className="w-4 h-4" /> Autonomía estudiantil
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-[var(--text-1)] font-normal mb-2">
              ¿Tienes una meta distinta en mente?
            </h3>
            <p className="text-sm text-[var(--text-2)] leading-relaxed">
              No tienes que ceñirte a los ejemplos fijados. Define el monto de tu propio proyecto, ajusta el ritmo diario que puedas asumir y calcula exactamente cuántos días te tomará.
            </p>
          </div>

          <Button
            size="md"
            variant="primary"
            onClick={() => setModalOpen(true)}
            rightIcon={<Sliders className="w-4 h-4" />}
            className="flex-shrink-0"
          >
            Definir mi propia meta
          </Button>
        </motion.div>

        {/* Legal Disclaimer for Challenges */}
        <p className="mt-6 text-center text-xs text-[var(--text-4)] max-w-3xl mx-auto">
          Los retos son propuestas educativas y guías metodológicas. Surcos Saving no administra cuentas bancarias ni fondos de terceros; cada estudiante gestiona sus propios recursos bajo la supervisión de su familia.
        </p>

        {/* Interactive Custom Goal Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Diseña tu reto personal de ahorro"
          description="Calcula el esfuerzo diario necesario para financiar una idea o comprar un material."
          size="md"
        >
          <div className="space-y-4">
            <Input
              label="¿Cuál es tu meta?"
              placeholder="Ej. Kit de pintura para feria o Curso online"
              value={customGoalName}
              onChange={(e) => setCustomGoalName(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="¿Cuánto dinero necesitas? ($)"
                type="number"
                step="1"
                min="1"
                value={customGoalTarget}
                onChange={(e) => setCustomGoalTarget(e.target.value)}
              />
              <Input
                label="¿Cuánto puedes apartar al día? ($)"
                type="number"
                step="0.05"
                min="0.01"
                value={customPace}
                onChange={(e) => setCustomPace(e.target.value)}
              />
            </div>

            {/* Calculated Plan Output */}
            <div className="rounded-2xl bg-[var(--off-white)] p-5 border border-[var(--border-light)] mt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-3)] mb-2">
                Plan calculado para {customGoalName || 'tu meta'}
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-mono text-3xl font-bold text-[var(--accent)]">
                  {daysNeeded} días
                </span>
                <span className="text-xs text-[var(--text-3)] font-medium">
                  (aprox. {monthsNeeded} meses)
                </span>
              </div>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Guardando <strong>{formatCurrency(paceNum)}</strong> cada día, reunirás <strong>{formatCurrency(targetNum)}</strong> sin necesidad de endeudarte.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <Button size="sm" variant="primary" onClick={() => setModalOpen(false)}>
                Entendido, ¡voy a intentarlo!
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
}
