'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SectionHeading } from '@/components/marketing/SectionHeading';
import { GraduationCap, Terminal, BrainCircuit } from 'lucide-react';
import { EASE_OUT, DURATIONS } from '@/components/marketing/motion-tokens';

export function TrainingSection() {
  const reduce = useReducedMotion() ?? false;
  const tracks = [
    {
      id: 'finance',
      icon: GraduationCap,
      tag: 'Administración y criterio económico',
      title: 'Educación financiera',
      desc: 'Presupuestos, ahorro con metas y estructura de costes para ferias.',
      modules: [
        'Presupuestos personales y control del flujo diario',
        'Ahorro disciplinado con metas alcanzables',
        'Costes, precios y margen neto',
        'Viabilidad del emprendimiento estudiantil',
        'Inventario y caja en pequeñas ferias',
      ],
    },
    {
      id: 'tech',
      icon: Terminal,
      tag: 'De consumidores a creadores',
      title: 'Tecnología y desarrollo',
      desc: 'Programación y herramientas digitales para prototipar en horas.',
      modules: [
        'Fundamentos de programación y lógica',
        'Desarrollo web moderno y accesible',
        'IA aplicada en proyectos escolares',
        'Herramientas sin código para prototipar',
        'Automatización elemental de flujos',
      ],
    },
    {
      id: 'skills',
      icon: BrainCircuit,
      tag: 'Competencias transversales',
      title: 'Habilidades de alto valor',
      desc: 'Pensamiento crítico, comunicación y trabajo en equipo.',
      modules: [
        'Pensamiento crítico ante situaciones ambiguas',
        'Comunicación y presentación ante público',
        'Trabajo colaborativo multidisciplinario',
        'Gestión ágil de proyectos con fechas límite',
        'Investigación y aprendizaje autodirigido',
      ],
    },
  ];

  const startupSteps = [
    { num: '01', title: 'Aprender', desc: 'Dominar una habilidad técnica.' },
    { num: '02', title: 'Identificar', desc: 'Detectar una necesidad real en tu comunidad.' },
    { num: '03', title: 'Diseñar', desc: 'La solución más simple al problema.' },
    { num: '04', title: 'Construir', desc: 'Un prototipo funcional mínimo.' },
    { num: '05', title: 'Validar', desc: 'Probar con usuarios reales.' },
    { num: '06', title: 'Escalar', desc: 'Costes, precio sostenible y crecimiento.' },
  ];

  return (
    <section id="formacion" className="bg-[var(--white)] border-b border-[var(--border-light)] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Formación"
          title={
            <>
              De consumidores{' '}
              <em className="italic font-normal text-[var(--text-3)]">a creadores.</em>
            </>
          }
          subtitle="Ahorrar y emprender se multiplican cuando adquieres conocimientos técnicos que te permiten construir herramientas propias."
        />
        <p className="text-[0.82rem] text-[var(--text-3)] mt-6">
          Ejes temáticos en desarrollo · Talleres y cápsulas pedagógicas · Básica y bachillerato
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mt-12 md:mt-16">
          {tracks.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduce ? 0.2 : DURATIONS.smooth, delay: idx * 0.08, ease: EASE_OUT }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[var(--white)] border border-[var(--border-light)] shadow-[var(--shadow-subtle)] flex items-center justify-center">
                  <t.icon size={18} className="text-[var(--accent)]" />
                </div>
                <span className="text-[0.72rem] font-bold uppercase tracking-wider text-[var(--accent)]">
                  {t.tag}
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-[1.7rem] text-[var(--text-1)] tracking-tight leading-[1.15] mb-3">
                {t.title}
              </h3>
              <p className="text-[0.95rem] text-[var(--text-2)] leading-relaxed mb-6">{t.desc}</p>
              <ul className="space-y-2.5">
                {t.modules.map((m) => (
                  <li key={m} className="flex items-start gap-2.5 text-[0.92rem] text-[var(--text-2)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-[var(--border-light)]">
          <h3 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-[var(--text-1)] tracking-tight leading-[1.12] mb-2 max-w-2xl">
            Cómo una habilidad se convierte en startup.
          </h3>
          <p className="text-[0.95rem] text-[var(--text-2)] leading-relaxed max-w-2xl mb-8">
            El software democratiza la experimentación: de la idea al prototipo con costo
            inicial cercano a cero. Wang empezó con matemáticas y programación; esa base
            le mostró dónde fallaba la industria de la IA.
          </p>
          <ol className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {startupSteps.map((s) => (
              <li key={s.num}>
                <span className="font-serif text-[1.4rem] text-[var(--text-4)] leading-none block">{s.num}</span>
                <span className="block text-[0.9rem] font-semibold text-[var(--text-1)] mt-2">{s.title}</span>
                <span className="block text-[0.82rem] text-[var(--text-3)] mt-1 leading-relaxed">{s.desc}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
