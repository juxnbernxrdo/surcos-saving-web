'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '@/components/marketing/SectionHeading';
import { EASE_OUT } from '@/components/marketing/motion-tokens';
import { cn } from '@/lib/utils';

export function InspiringStoriesSection() {
  const [activeFigure, setActiveFigure] = useState<string>('wang');

  const profiles = [
    {
      id: 'wang',
      name: 'Alexander Wang',
      role: 'Cofundador de Scale AI',
      category: 'Tecnología e inteligencia artificial',
      summary: 'Una habilidad técnica de alto valor, combinada con la detección temprana de un cuello de botella, puede convertirse en una empresa mundial.',
      bio: 'Criado en Los Álamos por padres físicos, compitió en olimpiadas de matemáticas y programación. En el MIT detectó que el obstáculo de la IA no eran los algoritmos, sino la falta de datos etiquetados. A los 19 años cofundó Scale AI.',
      whatBuilt: 'Scale AI: infraestructura de anotación y evaluación de datos para modelos fundacionales de IA.',
      studentLesson: 'Programar te permite construir prototipos sin grandes presupuestos. Si detectas un problema real y sabes construir la solución, tienes ventaja decisiva.',
      distinction: 'Scale AI se financió con capital de riesgo institucional. El ahorro personal solo sostuvo la fase de prototipo inicial.',
      source: 'Forbes 30 Under 30; MIT Technology Review.',
    },
    {
      id: 'musk',
      name: 'Elon Musk',
      role: 'Cofundador de Zip2, PayPal, SpaceX y Tesla',
      category: 'Visión, riesgo y reinversión',
      summary: 'Experimentación técnica, tolerancia al riesgo calculado y reinversión deliberada en metas de mayor alcance.',
      bio: 'Programaba videojuegos en su infancia en Sudáfrica. Fundó Zip2 y cofundó X.com (luego PayPal). Tras la venta a eBay, reinvirtió casi todo su capital en SpaceX y Tesla.',
      whatBuilt: 'Compañías pioneras en software financiero, astronáutica reutilizable y vehículos eléctricos.',
      studentLesson: 'La disciplina con el dinero da margen para asumir riesgos calculados. Reinvertir las primeras ganancias escolares es el germen de esta mentalidad.',
      distinction: 'Sus empresas requirieron miles de millones en capital de riesgo y contratos NASA. El ahorro personal fue solo la chispa.',
      source: 'Biografía de Walter Isaacson (2023); reportes ante la SEC.',
    },
    {
      id: 'buffett',
      name: 'Warren Buffett',
      role: 'Presidente de Berkshire Hathaway',
      category: 'Disciplina financiera y largo plazo',
      summary: 'Paciencia, interés compuesto y distinción rigurosa entre proteger el dinero (ahorro) y hacerlo trabajar (inversión).',
      bio: 'Desde los 11 años vendía periódicos y anotaba cada ingreso en cuadernos. Formado con Benjamin Graham en Columbia, construyó Berkshire con décadas de asignación disciplinada de capital.',
      whatBuilt: 'Uno de los conglomerados más admirados de la historia mediante inversión a largo plazo.',
      studentLesson: 'Gastar menos de lo que ingresas, evitar deudas por consumo y entender en qué colocas tu dinero antes de arriesgarlo.',
      distinction: 'Ahorrar e invertir son disciplinas distintas: el ahorro preserva el margen; la inversión asume riesgos calculados.',
      source: 'Cartas a accionistas de Berkshire; “The Snowball” de Alice Schroeder.',
    },
  ];

  const current = profiles.find((p) => p.id === activeFigure) || profiles[0];

  return (
    <section id="historias" className="bg-[var(--white)] border-b border-[var(--border-light)] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Perspectiva editorial"
          title={
            <>
              Del ahorro a la creación{' '}
              <em className="italic font-normal text-[var(--text-3)]">de empresas.</em>
            </>
          }
          subtitle="Referentes reales con rigor: la frontera entre ahorro personal, capital de riesgo y ejecución."
        />

        {/* Selector — texto plano con indicador deslizante animado */}
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-b border-[var(--border-light)]">
          {profiles.map((p) => {
            const isSelected = activeFigure === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveFigure(p.id)}
                aria-pressed={isSelected}
                className={cn(
                  'relative pb-3 text-[0.95rem] font-semibold transition-colors cursor-pointer -mb-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-t-sm active:scale-[0.98]',
                  isSelected
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--text-3)] hover:text-[var(--text-1)]'
                )}
              >
                {p.name}
                {isSelected && (
                  <motion.span
                    layoutId="storiesIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl"
          >
            <div className="lg:col-span-7">
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[var(--accent)] block mb-3">
                {current.category}
              </span>
              <h3 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-[var(--text-1)] tracking-tight leading-[1.12] mb-1">
                {current.name}
              </h3>
              <p className="text-[0.95rem] font-medium text-[var(--text-3)] mb-6">{current.role}</p>
              <p className="text-[0.95rem] text-[var(--text-2)] leading-relaxed mb-4">{current.bio}</p>
              <p className="text-[0.95rem] text-[var(--text-2)] leading-relaxed">
                <strong className="text-[var(--text-1)] font-semibold">Qué construyó: </strong>
                {current.whatBuilt}
              </p>
              <p className="text-[0.82rem] text-[var(--text-4)] mt-6 pt-4 border-t border-[var(--border-light)]">
                Fuente: {current.source}
              </p>
            </div>

            <div className="lg:col-span-5">
              <p className="text-[0.95rem] text-[var(--text-2)] leading-relaxed mb-6">{current.summary}</p>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5 text-[0.92rem] text-[var(--text-2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                  <span>{current.studentLesson}</span>
                </li>
                <li className="flex items-start gap-2.5 text-[0.92rem] text-[var(--text-3)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-4)] mt-2 shrink-0" />
                  <span>{current.distinction}</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
