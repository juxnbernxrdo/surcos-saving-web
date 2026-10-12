'use client';

import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '@/components/marketing/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { useEntrancePresets } from '@/components/marketing/motion-tokens';
import {
  Compass,
  FileSpreadsheet,
  UsersRound,
  Presentation,
  Laptop2,
  HeartHandshake,
  Lightbulb,
  Medal,
  Lock,
} from 'lucide-react';

export function FutureRoadmapSection() {
  const { fadeUp } = useEntrancePresets();

  const offerings = [
    {
      title: 'Retos grupales e inter-aulas',
      status: 'En desarrollo',
      badgeVariant: 'accent' as const,
      desc: 'Dinámicas entre paralelos para fomentar la constancia colectiva sin competir por quién tiene más dinero, sino por quién mantiene el hábito.',
      icon: UsersRound,
    },
    {
      title: 'Hojas imprimibles de seguimiento',
      status: 'Próximamente',
      badgeVariant: 'default' as const,
      desc: 'Plantillas descargables en PDF para registrar ingresos, gastos diarios y metas de ahorro pegadas en el cuaderno o pared.',
      icon: FileSpreadsheet,
    },
    {
      title: 'Talleres de precios y márgenes',
      status: 'En desarrollo',
      badgeVariant: 'accent' as const,
      desc: 'Sesiones presenciales previas a las ferias para calcular costes de insumos, margen de beneficio y precio al público.',
      icon: Presentation,
    },
    {
      title: 'Mentorías para ideas escolares',
      status: 'Propuesta',
      badgeVariant: 'outline' as const,
      desc: 'Espacio de retroalimentación donde estudiantes mayores orientan a los más jóvenes en el diseño y viabilidad de sus productos.',
      icon: Lightbulb,
    },
    {
      title: 'Taller: Mi primera web o catálogo',
      status: 'Propuesta',
      badgeVariant: 'outline' as const,
      desc: 'Aprender lo básico de desarrollo web para publicar un catálogo digital de productos escolares sin depender de plataformas costosas.',
      icon: Laptop2,
    },
    {
      title: 'Materiales y guías para familias',
      status: 'En desarrollo',
      badgeVariant: 'accent' as const,
      desc: 'Orientaciones prácticas para que padres de familia acompañen las decisiones financieras de sus hijos en el hogar.',
      icon: HeartHandshake,
    },
    {
      title: 'Reconocimientos a la constancia',
      status: 'En evaluación',
      badgeVariant: 'default' as const,
      desc: 'Menciones educativas al compromiso y la perseverancia sostenida, sin premiar el volumen de dinero acumulado.',
      icon: Medal,
    },
  ];

  return (
    <section className="py-20 md:py-28 border-b border-[var(--border-light)] bg-[var(--white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Visión y futuro"
          eyebrowIcon={<Compass className="w-3.5 h-3.5" />}
          title="¿Qué más puede ofrecer Surcos Saving?"
          subtitle="Una iniciativa pensada para evolucionar con la comunidad educativa: iniciativas activas, propuestas en desarrollo y compromisos claros."
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="rounded-2xl border border-[var(--border-light)] bg-[var(--white)] p-6 shadow-xs hover:border-[var(--border)] transition-all duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5 stroke-[2]" />
                    </div>
                    <Badge variant={item.badgeVariant} size="sm">
                      {item.status}
                    </Badge>
                  </div>

                  <h3 className="text-base font-semibold text-[var(--text-1)] tracking-tight mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-2)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Strict Ethical Boundary Box */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--off-white)] p-6 text-xs text-[var(--text-2)] leading-relaxed flex items-start gap-3 max-w-4xl mx-auto"
        >
          <Lock className="w-5 h-5 text-[var(--text-3)] flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-[var(--text-1)] block mb-1">
              Límites operativos claros y seguridad de los estudiantes:
            </strong>
            Surcos Saving no es una entidad financiera, cooperativa ni plataforma de pagos. No recibe depósitos, no custodia dinero de alumnos ni familias, ni ejecuta transacciones bancarias. Todas las actividades son 100% pedagógicas y la tenencia de cualquier fondo físico de ahorro o venta en feria permanece siempre en manos del propio estudiante y su representante legal.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
