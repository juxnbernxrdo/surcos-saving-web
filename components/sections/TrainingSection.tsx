'use client';

import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '@/components/marketing/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { useEntrancePresets } from '@/components/marketing/motion-tokens';
import {
  GraduationCap,
  Code2,
  BrainCircuit,
  Users2,
  Sparkles,
  ArrowRight,
  Layers,
  Terminal,
  Search,
  Wrench,
  CheckCircle,
} from 'lucide-react';

export function TrainingSection() {
  const { fadeUp } = useEntrancePresets();

  const tracks = [
    {
      id: 'finance',
      title: 'Educación financiera',
      badge: 'Bases de gestión',
      icon: Layers,
      accentColor: 'text-[var(--accent)]',
      bgColor: 'bg-[var(--accent-soft)]',
      modules: [
        'Presupuestos personales y control del flujo de dinero',
        'Ahorro disciplinado y fijación de metas alcanzables',
        'Estructura de costes, cálculo de precios y margen neto',
        'Introducción al emprendimiento escolar',
        'Gestión elemental de un pequeño negocio o feria',
      ],
    },
    {
      id: 'tech',
      title: 'Tecnología y desarrollo',
      badge: 'Creación digital',
      icon: Terminal,
      accentColor: 'text-[var(--green)]',
      bgColor: 'bg-[var(--green-soft)]',
      modules: [
        'Fundamentos de programación y lógica computacional',
        'Desarrollo web moderno (estructuración y diseño)',
        'Inteligencia artificial y aplicaciones productivas',
        'Herramientas digitales sin código para prototipar rápido',
        'Automatización básica de tareas y resolución de problemas',
      ],
    },
    {
      id: 'skills',
      title: 'Habilidades de alto valor',
      badge: 'Competencias futuras',
      icon: BrainCircuit,
      accentColor: 'text-[var(--amber)]',
      bgColor: 'bg-[var(--amber-soft)]',
      modules: [
        'Pensamiento crítico y análisis de situaciones complejas',
        'Comunicación clara y presentación oral de propuestas',
        'Trabajo colaborativo y coordinación en equipo',
        'Gestión ágil de pequeños proyectos estudiantiles',
        'Investigación rigurosa y aprendizaje autónomo continuo',
      ],
    },
  ];

  const startupSteps = [
    { num: '1', title: 'Aprender', desc: 'Dominar una habilidad técnica o metodológica (código, diseño, finanzas).' },
    { num: '2', title: 'Identificar un problema', desc: 'Detectar una necesidad real y repetitiva en tu entorno o comunidad.' },
    { num: '3', title: 'Diseñar la solución', desc: 'Imaginar la herramienta o servicio más simple que resuelve el dolor.' },
    { num: '4', title: 'Construir el prototipo', desc: 'Crear una versión funcional mínima sin gastar grandes sumas.' },
    { num: '5', title: 'Validar con usuarios', desc: 'Ponerlo a prueba con personas reales y escuchar sus críticas sinceras.' },
    { num: '6', title: 'Desarrollar un negocio', desc: 'Estructurar costes, precios sostenibles y expandir la solución.' },
  ];

  return (
    <section id="formacion" className="py-20 md:py-28 border-b border-[var(--border-light)] bg-[var(--off-white)]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Formación complementaria"
          eyebrowIcon={<GraduationCap className="w-3.5 h-3.5" />}
          title="Habilidades para el futuro: de consumidores a creadores"
          subtitle="Ahorrar y emprender se potencian cuando adquieres conocimientos técnicos y profesionales que multiplican lo que eres capaz de construir."
          align="center"
        />

        {/* Status banner */}
        <div className="flex justify-center mt-6">
          <Badge variant="outline" size="sm">
            Ejes temáticos en desarrollo · Talleres y cápsulas pedagógicas
          </Badge>
        </div>

        {/* 3 Tracks Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {tracks.map((t) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="rounded-2xl border border-[var(--border-light)] bg-[var(--white)] p-6 sm:p-7 shadow-[var(--shadow-subtle)] hover:border-[var(--border)] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl ${t.bgColor} ${t.accentColor} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <span className="text-[11px] font-semibold text-[var(--text-3)] font-mono">
                      {t.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-[var(--text-1)] tracking-tight mb-4">
                    {t.title}
                  </h3>

                  <ul className="space-y-2.5 mb-6">
                    {t.modules.map((m, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-2)] leading-relaxed">
                        <CheckCircle className="w-3.5 h-3.5 text-[var(--green)] flex-shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[var(--border-light)] text-[11px] text-[var(--text-4)]">
                  Orientado a estudiantes de educación básica y bachillerato
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Section I: Cómo una habilidad puede convertirse en una startup */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 rounded-3xl border border-[var(--border)] bg-[var(--white)] p-6 sm:p-10 shadow-[var(--shadow-default)]"
        >
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] block mb-1">
              Ruta de escalamiento tecnológico
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[var(--text-1)] font-normal mb-3">
              Cómo una habilidad técnica puede convertirse en una startup
            </h3>
            <p className="text-sm text-[var(--text-2)] leading-relaxed">
              Aprender programación y desarrollo de software no garantiza crear una empresa millonaria, pero transforma radicalmente tus posibilidades: te permite pasar de imaginar una idea a construir prototipos funcionales con costo de capital inicial cercano a cero.
            </p>
          </div>

          {/* 6 Step Progression Flow */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-[var(--border-light)]">
            {startupSteps.map((s) => (
              <div key={s.num} className="p-3.5 rounded-xl bg-[var(--off-white)] border border-[var(--border-light)] text-center flex flex-col justify-between">
                <div>
                  <span className="w-6 h-6 rounded-full bg-[var(--white)] border border-[var(--border)] font-mono text-xs font-bold text-[var(--accent)] inline-flex items-center justify-center mb-2">
                    {s.num}
                  </span>
                  <h4 className="text-xs font-semibold text-[var(--text-1)] mb-1">
                    {s.title}
                  </h4>
                  <p className="text-[11px] text-[var(--text-3)] leading-tight">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Transparent Realism Note */}
          <div className="mt-8 p-4 rounded-xl bg-[var(--accent-soft)]/40 border border-[var(--accent)]/15 text-xs text-[var(--text-2)] leading-relaxed">
            <strong className="text-[var(--text-1)]">Perspectiva honesta: </strong>
            El software democratiza la experimentación. Quien sabe programar puede construir su propia página web, una herramienta de inventario o un prototipo con inteligencia artificial sin tener que contratar a terceros. Eso es lo que abre puertas a oportunidades reales.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
