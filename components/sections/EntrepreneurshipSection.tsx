'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '@/components/marketing/SectionHeading';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export function EntrepreneurshipSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [unitPrice, setUnitPrice] = useState<string>('2.50');
  const [unitsSold, setUnitsSold] = useState<string>('25');
  const [unitCost, setUnitCost] = useState<string>('1.00');
  const [fixedCosts, setFixedCosts] = useState<string>('5.00');

  const p = Math.max(0.01, parseFloat(unitPrice) || 0);
  const q = Math.max(1, parseInt(unitsSold, 10) || 0);
  const c = Math.max(0, parseFloat(unitCost) || 0);
  const f = Math.max(0, parseFloat(fixedCosts) || 0);

  const grossRevenue = Number((p * q).toFixed(2));
  const variableCosts = Number((c * q).toFixed(2));
  const totalCosts = Number((variableCosts + f).toFixed(2));
  const estimatedProfit = Number((grossRevenue - totalCosts).toFixed(2));
  const profitMarginPercent = grossRevenue > 0 ? Number(((estimatedProfit / grossRevenue) * 100).toFixed(1)) : 0;
  const unitContribution = p - c;
  const breakEvenUnits = unitContribution > 0 ? Math.ceil(f / unitContribution) : 0;

  const suggestedReinvestment = estimatedProfit > 0 ? Number((estimatedProfit * 0.50).toFixed(2)) : 0;
  const suggestedSavingsReserve = estimatedProfit > 0 ? Number((estimatedProfit * 0.30).toFixed(2)) : 0;
  const suggestedPersonalReward = estimatedProfit > 0 ? Number((estimatedProfit * 0.20).toFixed(2)) : 0;

  const steps = [
    { num: '01', title: 'Identificar una necesidad', desc: 'Observar hábitos de compañeros y docentes: ¿necesitan libretas, stickers o llaveros?' },
    { num: '02', title: 'Definir producto y costes', desc: 'Desglosar cada material y calcular el coste unitario exacto de una pieza.' },
    { num: '03', title: 'Calcular precio y margen', desc: 'Precio justo que cubra insumos, empaque y reconozca el valor de tu tiempo.' },
    { num: '04', title: 'Autorización y preparación', desc: 'Presentar la propuesta según el reglamento de la Unidad Educativa Surcos.' },
    { num: '05', title: 'Vender en la feria', desc: 'Atender la mesa, explicar el valor de tu creación y registrar cada venta.' },
    { num: '06', title: 'Cierre y reinversión', desc: 'Restar costes, separar el 30% de reserva y reiniciar con el 50% de reinversión.' },
  ];

  const studentProducts = [
    { category: 'Papelería personalizada', examples: 'Separadores, libretas cosidas a mano, stickers', cost: '$0.30 – $0.80', price: '$1.50 – $3.00' },
    { category: 'Artesanías y accesorios', examples: 'Pulseras tejidas, llaveros en resina, prendedores', cost: '$0.50 – $1.20', price: '$2.00 – $4.50' },
    { category: 'Ilustraciones y arte', examples: 'Postales temáticas, acuarelas, dedicatorias', cost: '$0.40 – $1.00', price: '$2.00 – $5.00' },
    { category: 'Artículos ecológicos', examples: 'Portalápices reciclados, estuches de tela', cost: '$0.20 – $0.60', price: '$1.50 – $3.50' },
  ];

  const concepts = [
    { term: 'Ingresos brutos', def: 'Dinero total cobrado al vender todas las unidades (precio × cantidad).' },
    { term: 'Costes variables', def: 'Gasto en insumos que aumenta con cada unidad producida.' },
    { term: 'Costes fijos', def: 'Gastos únicos que no varían por pieza (cartel, cinta, empaques).' },
    { term: 'Ganancia neta', def: 'Lo que sobra tras recuperar la totalidad de costes.' },
    { term: 'Margen (%)', def: 'Porcentaje del ingreso que se convierte en ganancia real.' },
    { term: 'Punto de equilibrio', def: 'Unidades exactas que debes vender para no perder dinero.' },
  ];

  return (
    <section id="emprendimiento" className="bg-[var(--off-white)] border-b border-[var(--border-light)] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          align="center"
          eyebrow="Ferias y práctica"
          title={
            <>
              De una idea a una venta{' '}
              <em className="italic font-normal text-[var(--accent)]">real en tu colegio.</em>
            </>
          }
          subtitle="El ahorro financia tus insumos; las ferias presenciales te dan tu primera experiencia empresarial."
          className="mb-16 md:mb-20"
        />

        {/* Ruta metodológica — 6 pasos editoriales */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {steps.map((st) => (
            <article key={st.num} className="text-center sm:text-left">
              <span aria-hidden="true" className="block font-serif text-[clamp(2rem,3vw,2.6rem)] leading-none text-[var(--text-4)] opacity-60 select-none">
                {st.num}
              </span>
              <h3 className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-[var(--text-1)] mt-4 mb-2">
                {st.title}
              </h3>
              <p className="text-[0.9rem] leading-[1.7] text-[var(--text-2)]">{st.desc}</p>
            </article>
          ))}
        </div>

        {/* Catálogo — tabla, no inspector con cajas */}
        <div className="mt-16 md:mt-20 max-w-6xl mx-auto">
          <h3 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-[var(--text-1)] tracking-tight leading-[1.12] mb-2">
            Productos viables para ferias escolares.
          </h3>
          <p className="text-[0.95rem] text-[var(--text-3)] mb-8">Sujetos a normas y calendario de la Unidad Educativa Surcos.</p>
          <div className="border-y border-[var(--border-light)] overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[640px]">
              <thead>
                <tr className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-4)]">
                  <th className="py-3 pr-4">Categoría</th>
                  <th className="py-3 px-4">Ejemplos</th>
                  <th className="py-3 px-4 text-right">Coste</th>
                  <th className="py-3 pl-4 text-right">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-light)]">
                {studentProducts.map((prod) => (
                  <tr key={prod.category}>
                    <td className="py-4 pr-4 font-semibold text-[var(--text-1)]">{prod.category}</td>
                    <td className="py-4 px-4 text-[0.9rem] text-[var(--text-2)]">{prod.examples}</td>
                    <td className="py-4 px-4 text-right font-mono text-[var(--text-2)]">{prod.cost}</td>
                    <td className="py-4 pl-4 text-right font-mono font-bold text-[var(--accent)]">{prod.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Glosario — tabla de dos columnas */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h3 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-[var(--text-1)] tracking-tight leading-[1.12] mb-8">
            Seis conceptos antes de vender.
          </h3>
          <div className="border-y border-[var(--border-light)]">
            <dl className="divide-y divide-[var(--border-light)]">
              {concepts.map((c) => (
                <div key={c.term} className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-6 py-4">
                  <dt className="sm:col-span-4 text-[0.92rem] font-semibold text-[var(--text-1)]">{c.term}</dt>
                  <dd className="sm:col-span-8 text-[0.92rem] text-[var(--text-3)] leading-relaxed">{c.def}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Simulador — controles + fila dividida */}
        <div className="mt-16 md:mt-20 max-w-6xl mx-auto">
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[var(--accent)] block mb-3">
            Simulador de rentabilidad
          </span>
          <h3 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-[var(--text-1)] tracking-tight leading-[1.12] mb-2">
            ¿Cuánto ganarías en una feria?
          </h3>
          <p className="text-[0.95rem] text-[var(--text-2)] mb-8">
            Ganancia estimada = Ingresos por ventas − Costes totales.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <Input label="Precio unitario ($)" helperText="Por pieza" type="number" step="0.25" min="0.10" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
            <Input label="Unidades" helperText="Piezas elaboradas" type="number" step="5" min="1" value={unitsSold} onChange={(e) => setUnitsSold(e.target.value)} />
            <Input label="Coste unitario ($)" helperText="Material por pieza" type="number" step="0.10" min="0" value={unitCost} onChange={(e) => setUnitCost(e.target.value)} />
            <Input label="Costes fijos ($)" helperText="Letrero, empaque" type="number" step="1" min="0" value={fixedCosts} onChange={(e) => setFixedCosts(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-[var(--border-light)] border-y border-[var(--border-light)] py-8">
            <div className="md:pr-8">
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-3)] block mb-2">Ingresos brutos</span>
              <motion.div
                key={grossRevenue}
                initial={{ opacity: 0.8, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                className="font-mono font-bold text-[clamp(1.8rem,3vw,2.4rem)] text-[var(--text-1)] tracking-tight leading-none"
              >
                {formatCurrency(grossRevenue)}
              </motion.div>
              <p className="text-[0.82rem] text-[var(--text-3)] mt-2">{q} unidades × {formatCurrency(p)}</p>
            </div>
            <div className="md:px-8">
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-3)] block mb-2">Costes totales</span>
              <motion.div
                key={totalCosts}
                initial={{ opacity: 0.8, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                className="font-mono font-bold text-[clamp(1.8rem,3vw,2.4rem)] text-[var(--text-1)] tracking-tight leading-none"
              >
                {formatCurrency(totalCosts)}
              </motion.div>
              <p className="text-[0.82rem] text-[var(--text-3)] mt-2">Variables {formatCurrency(variableCosts)} + fijos {formatCurrency(f)}</p>
            </div>
            <div className="md:pl-8">
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[var(--accent)] block mb-2">Ganancia neta</span>
              <motion.div
                key={estimatedProfit}
                initial={{ opacity: 0.8, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                className="font-mono font-bold text-[clamp(1.8rem,3vw,2.4rem)] text-[var(--text-1)] tracking-tight leading-none"
              >
                {formatCurrency(estimatedProfit)}<span className="text-[var(--accent)] text-[0.55em]"> · {profitMarginPercent}%</span>
              </motion.div>
              <p className="text-[0.82rem] text-[var(--text-3)] mt-2">
                {estimatedProfit > 0
                  ? `50% reinversión ${formatCurrency(suggestedReinvestment)} · 30% reserva ${formatCurrency(suggestedSavingsReserve)} · 20% recompensa ${formatCurrency(suggestedPersonalReward)}`
                  : 'Reduce costes o ajusta el precio para lograr ganancia viable.'}
              </p>
            </div>
          </div>

          {breakEvenUnits > 0 && estimatedProfit > 0 && (
            <p className="text-center text-[0.9rem] text-[var(--text-3)] leading-relaxed max-w-xl mx-auto mt-8">
              Punto de equilibrio: vende {breakEvenUnits} unidades para recuperar tus costes fijos.
              Desde la unidad {breakEvenUnits + 1}, cada venta es ganancia neta.
            </p>
          )}

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-[var(--border-light)]">
            <p className="text-[0.95rem] text-[var(--text-3)] max-w-lg text-center sm:text-left">
              La participación depende de convocatorias oficiales y del reglamento estudiantil.
            </p>
            <Button size="md" variant="primary" onClick={() => setModalOpen(true)} rightIcon={<ArrowRight className="w-4 h-4" />} className="w-full sm:w-auto shrink-0">
              Quiero emprender en la feria
            </Button>
          </div>
        </div>

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Ruta de participación en feria escolar"
          description="Orientación oficial para estudiantes de la Unidad Educativa Surcos."
          size="md"
        >
          <div className="space-y-4">
            <ul className="space-y-2.5">
              {['Prototipo físico terminado y con fotos de muestra.', 'Cálculo de costes y precio completado en la calculadora.', 'Firma de autorización del representante legal (familiar).'].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.92rem] text-[var(--text-2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-[var(--text-3)] leading-relaxed pt-3 border-t border-[var(--border-light)]">
              Surcos Saving acompaña a los expositores con guías de registro de caja y atención al cliente.
            </p>
            <div className="pt-2 flex justify-end">
              <Button size="sm" variant="primary" onClick={() => setModalOpen(false)}>
                Entendido, prepararé mi propuesta
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
}
