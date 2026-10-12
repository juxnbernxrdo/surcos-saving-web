'use client';

import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '@/components/marketing/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatCurrency } from '@/lib/utils';
import {
  Calculator,
  Calendar,
  Sparkles,
  Info,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export function SavingsCalculatorSection() {
  const [dailyAmount, setDailyAmount] = useState<number>(0.10);
  const [days, setDays] = useState<number>(90);
  const [isCustomAmount, setIsCustomAmount] = useState<boolean>(false);
  const [customInputVal, setCustomInputVal] = useState<string>('0.10');

  const presetAmounts = [0.05, 0.10, 0.15, 0.25, 0.50];
  const presetPeriods = [
    { label: '7 días', days: 7, subtitle: '1 semana' },
    { label: '30 días', days: 30, subtitle: '1 mes' },
    { label: '90 días', days: 90, subtitle: '3 meses / 1 trimestre' },
    { label: '180 días', days: 180, subtitle: '6 meses / 1 semestre' },
    { label: '365 días', days: 365, subtitle: '1 año completo' },
  ];

  // Core formula: Ahorro acumulado = ahorro diario × número de días
  const totalSavings = Number((dailyAmount * days).toFixed(2));
  const weeklyEquivalent = Number((dailyAmount * 7).toFixed(2));
  const monthlyEquivalent = Number((dailyAmount * 30).toFixed(2));

  const handleSelectPresetAmount = (amt: number) => {
    setIsCustomAmount(false);
    setDailyAmount(amt);
    setCustomInputVal(amt.toFixed(2));
  };

  const handleCustomInputChange = (val: string) => {
    setCustomInputVal(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed >= 0) {
      setDailyAmount(parsed);
    }
  };

  // Practical educational comparison based on calculated total
  const getPracticalEquivalent = (amount: number) => {
    if (amount < 2) {
      return {
        item: 'Un cuaderno o juego de bolígrafos para clases',
        category: 'Útiles escolares básicos',
      };
    }
    if (amount < 5) {
      return {
        item: 'Material para prototipar tus primeras 5 muestras de artesanía',
        category: 'Primer prototipo',
      };
    }
    if (amount < 15) {
      return {
        item: 'Insumos completos para elaborar un lote de 20 pulseras o stickers escolares',
        category: 'Micro-emprendimiento',
      };
    }
    if (amount < 40) {
      return {
        item: 'Stock de insumos, empaque y exhibidor para tu mesa en la feria escolar',
        category: 'Participación en feria',
      };
    }
    if (amount < 100) {
      return {
        item: 'Herramientas duraderas, inventario completo y fondo de contingencia escolar',
        category: 'Mini-empresa escolar',
      };
    }
    return {
      item: 'Fondo semilla para formalizar un proyecto y reinvertir en múltiples ferias',
      category: 'Capital de desarrollo',
    };
  };

  const practicalGoal = getPracticalEquivalent(totalSavings);
  const liveRegionId = useId();

  return (
    <section id="calculadora" className="py-20 md:py-28 border-b border-[var(--border-light)] bg-[var(--off-white)]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Simulador interactivo"
          eyebrowIcon={<Calculator className="w-3.5 h-3.5" />}
          title="Calcula lo que puedes lograr con pequeñas monedas"
          subtitle="Explora cuánto podrías acumular si guardas una cantidad constante cada día. Sin especulación: pura constancia matemática."
          align="center"
        />

        <div className="mt-14 max-w-4xl mx-auto rounded-3xl border border-[var(--border)] bg-[var(--white)] shadow-[var(--shadow-default)] overflow-hidden">
          <div className="p-6 sm:p-8 md:p-10">
            {/* Step 1: Select daily amount */}
            <div className="mb-8">
              <div className="flex items-center justify-between gap-2 mb-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-3)]">
                  Paso 1: ¿Cuánto puedes apartar cada día?
                </label>
                <span className="text-xs text-[var(--accent)] font-medium font-mono">
                  {formatCurrency(dailyAmount)} / día
                </span>
              </div>

              {/* Preset Amount Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-4">
                {presetAmounts.map((amt) => {
                  const isSelected = !isCustomAmount && dailyAmount === amt;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleSelectPresetAmount(amt)}
                      className={`h-11 px-3 rounded-full text-sm font-semibold transition-all duration-150 cursor-pointer flex items-center justify-center border ${
                        isSelected
                          ? 'border-[var(--accent)] bg-[var(--accent)] text-white shadow-xs scale-[1.02]'
                          : 'border-[var(--border)] bg-[var(--white)] text-[var(--text-1)] hover:bg-[var(--off-white)] hover:border-[var(--text-3)] active:scale-[0.97]'
                      }`}
                    >
                      {formatCurrency(amt)}
                    </button>
                  );
                })}
              </div>

              {/* Custom Amount Toggle & Field */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCustomAmount(!isCustomAmount)}
                  className="text-xs text-[var(--accent)] hover:underline self-start font-medium cursor-pointer"
                >
                  {isCustomAmount ? '← Usar importes sugeridos' : '¿Prefieres ingresar otro valor?'}
                </button>

                {isCustomAmount && (
                  <div className="flex items-center gap-2 w-full sm:w-60">
                    <span className="text-sm font-mono text-[var(--text-3)]">$</span>
                    <Input
                      size="sm"
                      type="number"
                      step="0.01"
                      min="0.01"
                      max="100"
                      value={customInputVal}
                      onChange={(e) => handleCustomInputChange(e.target.value)}
                      placeholder="Ej. 0.35"
                      aria-label="Cantidad diaria personalizada en dólares"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Select Period */}
            <div className="mb-10 pt-6 border-t border-[var(--border-light)]">
              <div className="flex items-center justify-between gap-2 mb-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-3)]">
                  Paso 2: ¿Durante cuánto tiempo?
                </label>
                <span className="text-xs text-[var(--accent)] font-medium font-mono">
                  {days} días
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {presetPeriods.map((p) => {
                  const isSelected = days === p.days;
                  return (
                    <button
                      key={p.days}
                      type="button"
                      onClick={() => setDays(p.days)}
                      className={`p-3 rounded-2xl text-left transition-all duration-150 cursor-pointer border ${
                        isSelected
                          ? 'border-[var(--accent)] bg-[var(--accent-soft)] ring-1 ring-[var(--accent)]'
                          : 'border-[var(--border)] bg-[var(--white)] hover:bg-[var(--off-white)] active:scale-[0.98]'
                      }`}
                    >
                      <div className={`text-sm font-semibold ${isSelected ? 'text-[var(--accent)]' : 'text-[var(--text-1)]'}`}>
                        {p.label}
                      </div>
                      <div className="text-[11px] text-[var(--text-3)] mt-0.5">
                        {p.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Result Showcase */}
            <div
              id={liveRegionId}
              aria-live="polite"
              className="rounded-2xl border border-[var(--accent)]/30 bg-[radial-gradient(ellipse_at_top,var(--accent-soft),var(--white))] p-6 sm:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] block mb-1">
                    Ahorro acumulado estimado
                  </span>
                  <div className="font-mono text-4xl sm:text-5xl font-bold text-[var(--text-1)] tracking-tight">
                    {formatCurrency(totalSavings)}
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-3)] mt-2">
                    Ahorrando <strong>{formatCurrency(dailyAmount)}</strong> todos los días durante <strong>{days} días</strong>.
                  </p>
                </div>

                {/* Sub-breakdowns */}
                <div className="grid grid-cols-2 gap-3 border-t md:border-t-0 md:border-l border-[var(--border-light)] pt-4 md:pt-0 md:pl-6">
                  <div className="bg-[var(--white)] rounded-xl p-3 border border-[var(--border-light)] shadow-2xs">
                    <span className="text-[11px] text-[var(--text-3)] block">Por semana (7d)</span>
                    <span className="font-mono text-base font-bold text-[var(--text-1)]">
                      {formatCurrency(weeklyEquivalent)}
                    </span>
                  </div>
                  <div className="bg-[var(--white)] rounded-xl p-3 border border-[var(--border-light)] shadow-2xs">
                    <span className="text-[11px] text-[var(--text-3)] block">Por mes (30d)</span>
                    <span className="font-mono text-base font-bold text-[var(--text-1)]">
                      {formatCurrency(monthlyEquivalent)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Educational Context Comparison */}
              <div className="mt-6 pt-5 border-t border-[var(--border-light)]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[var(--white)]/70 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--green-soft)] text-[var(--green)] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-[var(--green)] uppercase tracking-wider block">
                      Equivalencia pedagógica · {practicalGoal.category}
                    </span>
                    <p className="text-xs sm:text-sm text-[var(--text-1)] font-medium">
                      {practicalGoal.item}
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const el = document.querySelector('#emprendimiento');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="self-start sm:self-auto text-xs"
                >
                  Ver calculadora de feria
                </Button>
              </div>
            </div>

            {/* Pedagogical Transparency Disclaimer */}
            <div className="mt-6 flex items-start gap-2.5 text-xs text-[var(--text-3)] leading-relaxed">
              <Info className="w-4 h-4 text-[var(--text-4)] flex-shrink-0 mt-0.5" />
              <p>
                <strong>Nota educativa:</strong> Esta simulación matemática supone que se reserva exactamente la cantidad indicada cada día del periodo, sin interrupciones ni gastos no previstos. Surcos Saving no es un banco ni una entidad de crédito; no capta fondos, no custodia depósitos ni promete rentabilidades o intereses financieros.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
