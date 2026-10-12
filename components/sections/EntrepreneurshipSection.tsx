'use client';

import React, { useState, useId } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '@/components/marketing/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useEntrancePresets } from '@/components/marketing/motion-tokens';
import { formatCurrency } from '@/lib/utils';
import {
  Store,
  Palette,
  Calculator,
  ArrowRight,
  Sparkles,
  Layers,
  HelpCircle,
  FileCheck2,
  TrendingUp,
  RotateCcw,
  AlertTriangle,
} from 'lucide-react';

export function EntrepreneurshipSection() {
  const { fadeUp } = useEntrancePresets();
  const [modalOpen, setModalOpen] = useState(false);

  // Entrepreneurship Calculator State
  const [unitPrice, setUnitPrice] = useState<string>('2.50');
  const [unitsSold, setUnitsSold] = useState<string>('25');
  const [unitCost, setUnitCost] = useState<string>('1.00');
  const [fixedCosts, setFixedCosts] = useState<string>('5.00'); // Packaging, signage

  const p = Math.max(0.01, parseFloat(unitPrice) || 0);
  const q = Math.max(1, parseInt(unitsSold, 10) || 0);
  const c = Math.max(0, parseFloat(unitCost) || 0);
  const f = Math.max(0, parseFloat(fixedCosts) || 0);

  // Calculations
  const grossRevenue = Number((p * q).toFixed(2));
  const variableCosts = Number((c * q).toFixed(2));
  const totalCosts = Number((variableCosts + f).toFixed(2));
  const estimatedProfit = Number((grossRevenue - totalCosts).toFixed(2));
  const profitMarginPercent = grossRevenue > 0
    ? Number(((estimatedProfit / grossRevenue) * 100).toFixed(1))
    : 0;
  
  // Breakeven units: f / (p - c)
  const unitContribution = p - c;
  const breakEvenUnits = unitContribution > 0
    ? Math.ceil(f / unitContribution)
    : 0;

  // Recommended cash split of profits (50% reinversion, 30% ahorro, 20% disfrute)
  const suggestedReinvestment = estimatedProfit > 0 ? Number((estimatedProfit * 0.50).toFixed(2)) : 0;
  const suggestedSavingsReserve = estimatedProfit > 0 ? Number((estimatedProfit * 0.30).toFixed(2)) : 0;
  const suggestedPersonalReward = estimatedProfit > 0 ? Number((estimatedProfit * 0.20).toFixed(2)) : 0;

  const steps = [
    {
      num: '01',
      title: 'Identificar una necesidad',
      desc: 'Observar los gustos de tus compañeros y profesores: ¿necesitan separadores para libros, stickers temáticos o llaveros de la promoción?',
    },
    {
      num: '02',
      title: 'Definir el producto y sus costes',
      desc: 'Determinar qué materiales compras, cuánto cuesta cada insumo y cuál es el coste exacto de elaborar una sola unidad.',
    },
    {
      num: '03',
      title: 'Calcular el precio y el margen',
      desc: 'Fijar un precio de venta justo que cubra los costes de insumos, los empaques y reconozca el valor de tu tiempo con una ganancia real.',
    },
    {
      num: '04',
      title: 'Autorizaciones y preparación',
      desc: 'Presentar la propuesta de producto según el reglamento y cronograma institucional de la Unidad Educativa Surcos.',
    },
    {
      num: '05',
      title: 'Vender en la feria presencial',
      desc: 'Atender a tus clientes con amabilidad, explicar el valor de lo que creaste y cobrar con claridad llevando el registro.',
    },
    {
      num: '06',
      title: 'Cierre de cuentas y reinversión',
      desc: 'Sumar ingresos, restar costes, celebrar la ganancia neta y separar una parte para reiniciar el ciclo en la siguiente feria.',
    },
  ];

  const studentProducts = [
    { title: 'Papelería personalizada', desc: 'Separadores de lectura, libretas cosidas a mano y stickers para cuadernos' },
    { title: 'Artesanías y accesorios', desc: 'Pulseras tejidas, llaveros en resina o arcilla y prendedores creativos' },
    { title: 'Ilustraciones y arte', desc: 'Postales temáticas, dibujos en acuarela y tarjetas de dedicatoria' },
    { title: 'Artículos escolares creativos', desc: 'Fundas para lápices recicladas, portalápices y organizadores' },
  ];

  const concepts = [
    { term: 'Ingresos', desc: 'Todo el dinero que entra por las ventas brutas totales.' },
    { term: 'Costes', desc: 'Lo que gastaste en materiales (variables) y empaque/letrero (fijos).' },
    { term: 'Ganancia real', desc: 'El sobrante neto tras haber recuperado todos tus costes.' },
    { term: 'Precio de venta', desc: 'El monto que paga el comprador por cada artículo.' },
    { term: 'Inventario', desc: 'El número de piezas que elaboraste y tienes disponibles.' },
    { term: 'Atención al cliente', desc: 'La amabilidad y claridad para explicar tu producto en la mesa.' },
    { term: 'Reinversión', desc: 'Apartar dinero para comprar mejores materiales la próxima vez.' },
    { term: 'Reserva de ahorro', desc: 'Guardar al menos el 30% de tu ganancia para construir capital.' },
  ];

  return (
    <section id="emprendimiento" className="py-20 md:py-28 border-b border-[var(--border-light)] bg-[var(--white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Experiencia práctica"
          eyebrowIcon={<Store className="w-3.5 h-3.5" />}
          title="De una idea a una venta real en tu colegio"
          subtitle="En Surcos Saving el ahorro tiene un propósito: convertirse en el capital semilla que te permita participar en ferias presenciales y vivir tu primera experiencia empresarial."
          align="center"
        />

        {/* 6 Steps Roadmap */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((st) => (
            <motion.div
              key={st.num}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="rounded-2xl border border-[var(--border-light)] bg-[var(--white)] p-6 shadow-xs hover:border-[var(--border)] transition-all duration-150"
            >
              <span className="font-mono text-2xl font-bold text-[var(--accent)] mb-2 block">
                {st.num}
              </span>
              <h3 className="text-base font-semibold text-[var(--text-1)] tracking-tight mb-2">
                {st.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-2)] leading-relaxed">
                {st.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Suitable School Products */}
        <div className="mt-14 rounded-3xl border border-[var(--border)] bg-[var(--off-white)] p-6 sm:p-8">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--green)] block mb-1">
              Catálogo pedagógico sugerido
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[var(--text-1)] font-normal">
              Ideas de productos viables para ferias estudiantiles
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-3)] mt-1">
              Sujetos a la autorización institucional y reglamentos de la Unidad Educativa Surcos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {studentProducts.map((p, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-[var(--white)] border border-[var(--border-light)] shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--green-soft)] text-[var(--green)] flex items-center justify-center mb-3">
                  <Palette className="w-4 h-4 stroke-[2]" />
                </div>
                <h4 className="text-sm font-semibold text-[var(--text-1)] mb-1">
                  {p.title}
                </h4>
                <p className="text-xs text-[var(--text-3)] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Essential Financial Concepts */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-serif text-2xl text-[var(--text-1)] font-normal">
              Conceptos clave que aprenderás antes de vender
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-3)] mt-1">
              Hablar de negocios con propiedad: no confundir nunca lo que cobras con lo que realmente ganas.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {concepts.map((c, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-xl border border-[var(--border-light)] bg-[var(--white)] shadow-2xs"
              >
                <span className="text-xs font-bold text-[var(--accent)] block mb-1">
                  {c.term}
                </span>
                <p className="text-[11px] sm:text-xs text-[var(--text-2)] leading-tight">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Entrepreneurship Calculator */}
        <div className="mt-16 rounded-3xl border border-[var(--border)] bg-[var(--white)] shadow-[var(--shadow-default)] overflow-hidden">
          <div className="p-6 sm:p-8 md:p-10">
            <div className="max-w-2xl mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-soft)] text-[var(--accent)] mb-2">
                <Calculator className="w-3.5 h-3.5" /> Herramienta de simulación de feria
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[var(--text-1)] font-normal mb-2">
                Calculadora interactiva de ganancia de tu emprendimiento
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-2)]">
                Fórmula oficial: <code className="font-mono bg-[var(--off-white)] px-2 py-0.5 rounded text-[var(--accent)] font-semibold">Ganancia estimada = Ingresos por ventas − Costes totales</code>
              </p>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Input
                label="Precio unitario ($)"
                helperText="A cuánto venderás cada pieza"
                type="number"
                step="0.25"
                min="0.10"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
              />

              <Input
                label="Unidades estimadas"
                helperText="Cuántas piezas elaborarás"
                type="number"
                step="5"
                min="1"
                value={unitsSold}
                onChange={(e) => setUnitsSold(e.target.value)}
              />

              <Input
                label="Coste unitario ($)"
                helperText="Material por cada pieza"
                type="number"
                step="0.10"
                min="0"
                value={unitCost}
                onChange={(e) => setUnitCost(e.target.value)}
              />

              <Input
                label="Costes fijos ($)"
                helperText="Empaque, letrero, mesa"
                type="number"
                step="1"
                min="0"
                value={fixedCosts}
                onChange={(e) => setFixedCosts(e.target.value)}
              />
            </div>

            {/* Visual Calculation Output Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-6 rounded-2xl bg-[var(--off-white)] border border-[var(--border-light)] mb-8">
              {/* Gross Revenue */}
              <div className="p-4 rounded-xl bg-[var(--white)] border border-[var(--border-light)] shadow-2xs">
                <span className="text-xs font-semibold text-[var(--text-3)] uppercase tracking-wider block mb-1">
                  Ingresos brutos
                </span>
                <div className="font-mono text-2xl font-bold text-[var(--text-1)]">
                  {formatCurrency(grossRevenue)}
                </div>
                <p className="text-[11px] text-[var(--text-3)] mt-1">
                  {q} unidades × {formatCurrency(p)}
                </p>
              </div>

              {/* Total Costs */}
              <div className="p-4 rounded-xl bg-[var(--white)] border border-[var(--border-light)] shadow-2xs">
                <span className="text-xs font-semibold text-[var(--text-3)] uppercase tracking-wider block mb-1">
                  Costes totales
                </span>
                <div className="font-mono text-2xl font-bold text-[var(--red)]">
                  {formatCurrency(totalCosts)}
                </div>
                <p className="text-[11px] text-[var(--text-3)] mt-1">
                  Insumos ({formatCurrency(variableCosts)}) + Fijos ({formatCurrency(f)})
                </p>
              </div>

              {/* Net Profit */}
              <div className="p-4 rounded-xl bg-[var(--white)] border border-[var(--green)]/30 shadow-2xs">
                <span className="text-xs font-semibold text-[var(--green)] uppercase tracking-wider block mb-1">
                  Ganancia neta estimada
                </span>
                <div className="font-mono text-2xl font-bold text-[var(--green)]">
                  {formatCurrency(estimatedProfit)}
                </div>
                <p className="text-[11px] text-[var(--text-3)] mt-1">
                  Margen: <strong>{profitMarginPercent}%</strong>
                </p>
              </div>
            </div>

            {/* Financial Health & Distribution Bar */}
            {estimatedProfit > 0 ? (
              <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--white)] p-6 mb-8">
                <h4 className="text-sm font-semibold text-[var(--text-1)] mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[var(--green)]" />
                  Distribución pedagógica sugerida de tu ganancia ({formatCurrency(estimatedProfit)})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/20">
                    <span className="font-semibold block">50% Reinversión ({formatCurrency(suggestedReinvestment)})</span>
                    <span className="text-[11px] text-[var(--text-2)] mt-0.5 block">Para comprar más stock en la siguiente feria</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--green-soft)] text-[var(--green)] border border-[var(--green)]/20">
                    <span className="font-semibold block">30% Ahorro ({formatCurrency(suggestedSavingsReserve)})</span>
                    <span className="text-[11px] text-[var(--text-2)] mt-0.5 block">Fondo de reserva intocable</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--off-white)] text-[var(--text-1)] border border-[var(--border-light)]">
                    <span className="font-semibold block">20% Disfrute ({formatCurrency(suggestedPersonalReward)})</span>
                    <span className="text-[11px] text-[var(--text-3)] mt-0.5 block">Recompensa a tu esfuerzo personal</span>
                  </div>
                </div>

                {breakEvenUnits > 0 && (
                  <p className="text-xs text-[var(--text-3)] mt-4">
                    💡 <strong>Punto de equilibrio:</strong> Necesitas vender <strong>{breakEvenUnits} unidades</strong> solo para recuperar tus costes fijos de {formatCurrency(f)}. A partir de la unidad {breakEvenUnits + 1}, cada venta es ganancia neta.
                  </p>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-[var(--amber)]/30 bg-[var(--amber-soft)] p-4 text-xs text-[var(--text-2)] mb-8 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-[var(--amber)] flex-shrink-0 mt-0.5" />
                <p>
                  Atención: Con estos valores el coste supera o iguala al ingreso. Intenta reducir los costes de materiales o ajustar el precio de venta para obtener una ganancia viable.
                </p>
              </div>
            )}

            {/* Section CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[var(--border-light)]">
              <p className="text-xs text-[var(--text-3)] max-w-xl">
                La participación en ferias depende de las fechas aprobadas, cupos, autorizaciones institucionales y el cumplimiento del reglamento estudiantil de la institución.
              </p>

              <Button
                size="md"
                variant="primary"
                onClick={() => setModalOpen(true)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto flex-shrink-0"
              >
                Quiero convertir mi idea en un emprendimiento
              </Button>
            </div>
          </div>
        </div>

        {/* Modal: Quiero convertir mi idea */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Inicia tu proyecto de emprendimiento"
          description="Ruta formativa para estudiantes de la Unidad Educativa Surcos."
          size="md"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[var(--off-white)] border border-[var(--border-light)]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-1">
                ¿Cuál es el siguiente paso?
              </h4>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                1. Diseña tu prototipo en casa y calcula los costes en la calculadora de arriba.
                <br />
                2. Prepara una muestra física de tu producto.
                <br />
                3. Consulta con tu tutor o el comité organizador de la Unidad Educativa Surcos para solicitar tu espacio en la próxima feria programada.
              </p>
            </div>

            <p className="text-xs text-[var(--text-3)] leading-relaxed">
              Surcos Saving acompaña a los estudiantes con guías descargables de precios y organización antes de cada feria oficial.
            </p>

            <div className="pt-2 flex justify-end">
              <Button size="sm" variant="primary" onClick={() => setModalOpen(false)}>
                ¡Comprendido, prepararé mi propuesta!
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
}
