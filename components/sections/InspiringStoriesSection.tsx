'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '@/components/marketing/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { useEntrancePresets } from '@/components/marketing/motion-tokens';
import {
  Lightbulb,
  Cpu,
  TrendingUp,
  ExternalLink,
  BookOpen,
  AlertCircle,
} from 'lucide-react';

export function InspiringStoriesSection() {
  const { fadeUp } = useEntrancePresets();
  const [activeStory, setActiveStory] = useState<string>('wang');

  const stories = [
    {
      id: 'wang',
      name: 'Alexander Wang',
      role: 'Cofundador de Scale AI',
      category: 'Tecnología & Inteligencia Artificial',
      badgeVariant: 'accent' as const,
      icon: Cpu,
      bio: 'Emprendedor tecnológico estadounidense. Tras formarse en matemáticas y computación e ingresar al MIT, identificó que el cuello de botella más grande de la inteligencia artificial moderna no eran los algoritmos, sino los datos etiquetados de alta calidad. A los 19 años cofundó Scale AI para resolver esta necesidad.',
      whatBuilt: 'Scale AI, infraestructura de etiquetado y evaluación de datos para modelos de aprendizaje profundo y visión artificial utilizada por industrias globales.',
      studentLesson: 'Desarrollar una habilidad técnica profunda (programación y matemáticas) permite detectar problemas reales y construir soluciones funcionales. La capacidad de ejecución abre las puertas a colaborar y levantar proyectos.',
      distinction: 'Scale AI creció mediante capital emprendedor (venture capital) e inversión externa institucional para financiar su rápida expansión, no únicamente con ahorros personales.',
      source: 'Forbes 30 Under 30; MIT Technology Review; Entrevistas documentadas en Stanford ETL.',
    },
    {
      id: 'musk',
      name: 'Elon Musk',
      role: 'Cofundador de Zip2, X.com/PayPal, SpaceX y Tesla',
      category: 'Visión, Riesgo & Re-inversión',
      badgeVariant: 'warning' as const,
      icon: Lightbulb,
      bio: 'Inició programando software en su adolescencia. Con su primera empresa de software (Zip2) aprendió sobre desarrollo y ventas comerciales. Posteriormente cofundó X.com (que luego se fusionó para formar PayPal). Tras la venta de PayPal, reinvirtió la mayor parte de su capital en proyectos de alto riesgo técnico: la exploración aeroespacial (SpaceX) y la movilidad eléctrica (Tesla).',
      whatBuilt: 'Múltiples empresas en software, finanzas digitales, exploración espacial y energía sostenible.',
      studentLesson: 'Aprender a tolerar el riesgo calculado, mantener la curiosidad técnica y tener la disposición de reinvertir el resultado de los primeros éxitos en metas de mayor alcance en lugar de conformarse.',
      distinction: 'Sus empresas requirieron miles de millones en capital de riesgo, subsidios de innovación y contratos comerciales. El ahorro personal es solo el primer cimiento de disciplina; la escala requiere gestión de riesgo empresarial.',
      source: 'Biografía autorizada por Walter Isaacson (2023); Presentaciones y reportes regulatorios ante la SEC.',
    },
    {
      id: 'buffett',
      name: 'Warren Buffett',
      role: 'Presidente y CEO de Berkshire Hathaway',
      category: 'Disciplina Financiera & Largo Plazo',
      badgeVariant: 'success' as const,
      icon: TrendingUp,
      bio: 'Comenzó realizando pequeños trabajos y vendiendo periódicos en su juventud, anotando cada centavo en libretas contables. Estudió bajo la mentoría de Benjamin Graham y construyó una de las trayectorias de asignación de capital más consistentes de la historia.',
      whatBuilt: 'El conglomerado Berkshire Hathaway mediante inversión disciplinada en negocios sólidos con ventajas competitivas sostenibles.',
      studentLesson: 'La paciencia y el interés compuesto premian la regularidad. Evitar deudas innecesarias, vivir por debajo de tus posibilidades y comprender a fondo en qué colocas tu dinero antes de asumir riesgos.',
      distinction: 'Buffett distingue con rigor el ahorro (conservación disciplinada de fondos) de la inversión (asunción de riesgos informados en activos productivos). Ahorrar genera el margen de seguridad para luego poder invertir.',
      source: 'Cartas anuales a los accionistas de Berkshire Hathaway; "The Snowball" por Alice Schroeder.',
    },
  ];

  return (
    <section className="py-20 md:py-28 border-b border-[var(--border-light)] bg-[var(--off-white)]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Perspectiva editorial"
          eyebrowIcon={<BookOpen className="w-3.5 h-3.5" />}
          title="Historias que inspiran: del ahorro a la creación de empresas"
          subtitle="Aprender de referentes reales exige rigor: entender la diferencia entre disciplina de ahorro, riesgo empresarial y capital de crecimiento."
          align="center"
        />

        {/* Tab Selector */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex p-1.5 rounded-full bg-[var(--white)] border border-[var(--border-light)] shadow-xs">
            {stories.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveStory(s.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  activeStory === s.id
                    ? 'bg-[var(--accent)] text-white shadow-xs'
                    : 'text-[var(--text-3)] hover:text-[var(--text-1)]'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Story Active Card */}
        {stories
          .filter((s) => s.id === activeStory)
          .map((story) => {
            const Icon = story.icon;
            return (
              <motion.div
                key={story.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-8 max-w-4xl mx-auto rounded-3xl border border-[var(--border)] bg-[var(--white)] p-6 sm:p-10 shadow-[var(--shadow-default)]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-light)]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[var(--text-1)]">
                        {story.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--text-3)]">
                        {story.role}
                      </p>
                    </div>
                  </div>
                  <Badge variant={story.badgeVariant} size="md">
                    {story.category}
                  </Badge>
                </div>

                <div className="pt-6 space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-3)] mb-2">
                      Trayectoria y contexto
                    </h4>
                    <p className="text-sm sm:text-base text-[var(--text-2)] leading-relaxed">
                      {story.bio}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="p-5 rounded-2xl bg-[var(--off-white)] border border-[var(--border-light)]">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-2">
                        Qué construyó
                      </h4>
                      <p className="text-xs sm:text-sm text-[var(--text-1)] leading-relaxed">
                        {story.whatBuilt}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[var(--green-soft)]/50 border border-[var(--green)]/20">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--green)] mb-2">
                        Aprendizaje para un estudiante
                      </h4>
                      <p className="text-xs sm:text-sm text-[var(--text-1)] leading-relaxed">
                        {story.studentLesson}
                      </p>
                    </div>
                  </div>

                  {/* Rigor note: Distinguishing personal savings from venture capital/risk */}
                  <div className="p-4 rounded-xl border border-[var(--amber)]/30 bg-[var(--amber-soft)]/60 text-xs text-[var(--text-2)] leading-relaxed flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-[var(--amber)] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[var(--text-1)]">Distinción clave: </strong>
                      {story.distinction}
                    </div>
                  </div>

                  {/* Verifiable citation */}
                  <div className="text-[11px] text-[var(--text-4)] pt-2 border-t border-[var(--border-light)] flex items-center justify-between">
                    <span>Fuente verificable: {story.source}</span>
                    <span className="font-mono">Hechos verificados</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
      </div>
    </section>
  );
}
