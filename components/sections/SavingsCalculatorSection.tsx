'use client';

import React, { useState, useId, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '@/components/marketing/SectionHeading';
import { Input } from '@/components/ui/Input';
import {
  CHALLENGES,
  FREE_DEFAULTS,
  SIMULATE_EVENT,
  formatCents,
  getChallengeById,
  parseChallengeHash,
  parseDollarsToCents,
  simulateSavings,
  validateSimulationFields,
  formatDateLong,
} from '@/lib/savings';
import { cn } from '@/lib/utils';

const PRESET_CENTS = [5, 10, 15, 25, 50];
const PRESET_PERIODS = [
  { label: '7 días', days: 7, subtitle: '1 semana' },
  { label: '30 días', days: 30, subtitle: '1 mes' },
  { label: '90 días', days: 90, subtitle: '3 meses' },
  { label: '180 días', days: 180, subtitle: '6 meses' },
  { label: '365 días', days: 365, subtitle: '1 año' },
];

const centsToDollars = (cents: number) => (cents / 100).toFixed(2);

export function SavingsCalculatorSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dailyCents, setDailyCents] = useState<number>(FREE_DEFAULTS.dailyCents);
  const [days, setDays] = useState<number>(FREE_DEFAULTS.days);
  const [goalCents, setGoalCents] = useState<number>(FREE_DEFAULTS.goalCents);
  const [rawDaily, setRawDaily] = useState(centsToDollars(FREE_DEFAULTS.dailyCents));
  const [rawDays, setRawDays] = useState(String(FREE_DEFAULTS.days));
  const [rawGoal, setRawGoal] = useState(centsToDollars(FREE_DEFAULTS.goalCents));
  const [startDate, setStartDate] = useState('');
  const [showExactDaily, setShowExactDaily] = useState(false);
  const [showExactDays, setShowExactDays] = useState(false);
  const liveRegionId = useId();

  const applyValues = useCallback((d: number, n: number, g: number) => {
    setDailyCents(d);
    setDays(n);
    setGoalCents(g);
    setRawDaily(centsToDollars(d));
    setRawDays(String(n));
    setRawGoal(centsToDollars(g));
  }, []);

  const selectChallenge = useCallback(
    (id: string | null, values?: { dailyCents: number; days: number; goalCents: number }) => {
      setSelectedId(id);
      if (values) applyValues(values.dailyCents, values.days, values.goalCents);
    },
    [applyValues]
  );

  // Carga inicial desde el hash (#calculadora/10c) + escucha de selecciones.
  useEffect(() => {
    const loadFromHash = () => {
      const id = parseChallengeHash(window.location.hash);
      const challenge = getChallengeById(id);
      if (challenge) {
        selectChallenge(challenge.id, {
          dailyCents: challenge.dailyCents,
          days: challenge.days,
          goalCents: challenge.goalCents,
        });
      }
    };
    loadFromHash();
    const onEvent = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const challenge = getChallengeById(id);
      if (challenge) {
        selectChallenge(challenge.id, {
          dailyCents: challenge.dailyCents,
          days: challenge.days,
          goalCents: challenge.goalCents,
        });
      }
    };
    window.addEventListener('hashchange', loadFromHash);
    window.addEventListener(SIMULATE_EVENT, onEvent as EventListener);
    return () => {
      window.removeEventListener('hashchange', loadFromHash);
      window.removeEventListener(SIMULATE_EVENT, onEvent as EventListener);
    };
  }, [selectChallenge]);

  const selected = getChallengeById(selectedId);
  const baseline = selected
    ? { dailyCents: selected.dailyCents, days: selected.days, goalCents: selected.goalCents }
    : FREE_DEFAULTS;
  const isCustomized =
    dailyCents !== baseline.dailyCents || days !== baseline.days || goalCents !== baseline.goalCents;

  const errors = validateSimulationFields({ daily: rawDaily, days: rawDays, goal: rawGoal, startDate });
  const hasErrors = Object.keys(errors).length > 0;
  const result = simulateSavings({
    dailyCents,
    days,
    goalCents,
    startDate: startDate.trim() === '' ? undefined : startDate.trim(),
  });

  const handleDailyText = (val: string) => {
    setRawDaily(val);
    const cents = parseDollarsToCents(val);
    if (!Number.isNaN(cents) && cents >= 1 && cents <= 10000) setDailyCents(cents);
  };

  const handleDaysText = (val: string) => {
    setRawDays(val);
    const n = Number(val);
    if (Number.isInteger(n) && n >= 1 && n <= 730) setDays(n);
  };

  const handleGoalText = (val: string) => {
    setRawGoal(val);
    const cents = parseDollarsToCents(val);
    if (!Number.isNaN(cents) && cents >= 1 && cents <= 10000000) setGoalCents(cents);
  };

  const handleReset = () => {
    applyValues(baseline.dailyCents, baseline.days, baseline.goalCents);
    setStartDate('');
    if (typeof window !== 'undefined') window.history.replaceState(null, '', '#calculadora');
  };

  const handleBackToRoutes = () => {
    const el = document.querySelector('#retos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="calculadora" className="bg-[var(--white)] border-b border-[var(--border-light)] py-20 md:py-28 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          align="center"
          eyebrow="Simulador financiero"
          title={
            <>
              Cuánto construye{' '}
              <em className="italic font-normal text-[var(--accent)]">tu constancia.</em>
            </>
          }
          subtitle="Elige un reto o ajusta los valores. Todo es proyección matemática: sin intereses, sin comisiones, sin promesas."
          className="mb-6"
        />

        {/* 1 · Contexto */}
        <div className="max-w-6xl mx-auto mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[var(--accent)] block mb-2">
              {selected ? `Simulando · ${selected.level}` : 'Simulación libre'}
            </span>
            <p className="font-serif text-[clamp(1.4rem,2.5vw,1.9rem)] text-[var(--text-1)] tracking-tight leading-tight">
              {selected ? selected.name : 'Explora tu propio ritmo'}
              {isCustomized && (
                <span className="text-[0.8rem] font-sans font-semibold text-[var(--amber)] ml-3 align-middle">
                  · personalizado
                </span>
              )}
            </p>
            {selected && (
              <p className="text-[0.9rem] text-[var(--text-3)] mt-1 max-w-xl">{selected.objective}</p>
            )}
          </div>
          {isCustomized && (
            <button
              type="button"
              onClick={handleReset}
              className="text-[0.85rem] font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors cursor-pointer shrink-0"
            >
              ← Volver a los valores del{selected ? ' reto' : ' inicio'}
            </button>
          )}
        </div>

        <div className="max-w-6xl mx-auto border border-[var(--border-light)] rounded-[16px] bg-[var(--white)] shadow-[var(--shadow-subtle)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-light)]">
            {/* 2 · Configuración */}
            <div className="p-6 sm:p-8 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-3)]">
                    Aporte diario
                  </label>
                  <span className="font-mono text-sm font-bold text-[var(--accent)]">
                    {formatCents(dailyCents)} al día
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {PRESET_CENTS.map((cents) => {
                    const isSelected = dailyCents === cents;
                    return (
                      <button
                        key={cents}
                        type="button"
                        onClick={() => {
                          setShowExactDaily(false);
                          setDailyCents(cents);
                          setRawDaily(centsToDollars(cents));
                        }}
                        aria-pressed={isSelected}
                        className={cn(
                          'h-10 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer flex items-center justify-center border active:scale-[0.97]',
                          isSelected
                            ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
                            : 'border-[var(--border-light)] bg-[var(--white)] text-[var(--text-1)] hover:bg-[var(--off-white)]'
                        )}
                      >
                        {formatCents(cents)}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  value={Math.min(Math.max(dailyCents, 1), 100)}
                  onChange={(e) => handleDailyText((Number(e.target.value) / 100).toFixed(2))}
                  aria-label="Ajustar aporte diario con deslizador (de $0.01 a $1.00)"
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[var(--text-4)] font-mono mt-1">
                  <span>$0.01</span>
                  <span>$0.50</span>
                  <span>$1.00</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowExactDaily(!showExactDaily)}
                  className="mt-2 text-[0.85rem] text-[var(--accent)] hover:text-[var(--accent-hover)] font-semibold transition-colors cursor-pointer"
                  aria-expanded={showExactDaily}
                >
                  {showExactDaily ? '← Ocultar valor exacto' : 'Ingresar un valor exacto'}
                </button>
                {showExactDaily && (
                  <div className="mt-2 max-w-xs">
                    <Input
                      size="sm"
                      type="number"
                      step="0.01"
                      min="0.01"
                      max="100"
                      value={rawDaily}
                      onChange={(e) => handleDailyText(e.target.value)}
                      placeholder="Ej. 0.35"
                      aria-label="Aporte diario exacto en dólares"
                      error={errors.daily}
                    />
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-[var(--border-light)]">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-3)]">
                    Duración
                  </label>
                  <span className="font-mono text-sm font-bold text-[var(--accent)]">{days} días</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {PRESET_PERIODS.map((p) => {
                    const isSelected = days === p.days;
                    return (
                      <button
                        key={p.days}
                        type="button"
                        onClick={() => {
                          setShowExactDays(false);
                          setDays(p.days);
                          setRawDays(String(p.days));
                        }}
                        aria-pressed={isSelected}
                        className={cn(
                          'p-2.5 rounded-lg text-left transition-all duration-150 cursor-pointer border active:scale-[0.98]',
                          isSelected
                            ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                            : 'border-[var(--border-light)] bg-[var(--white)] hover:bg-[var(--off-white)]'
                        )}
                      >
                        <div className={cn('text-xs font-semibold', isSelected ? 'text-[var(--accent)]' : 'text-[var(--text-1)]')}>
                          {p.label}
                        </div>
                        <div className="text-[10px] text-[var(--text-3)] truncate mt-0.5">{p.subtitle}</div>
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => setShowExactDays(!showExactDays)}
                  className="mt-2 text-[0.85rem] text-[var(--accent)] hover:text-[var(--accent-hover)] font-semibold transition-colors cursor-pointer"
                  aria-expanded={showExactDays}
                >
                  {showExactDays ? '← Ocultar duración exacta' : 'Ingresar duración exacta'}
                </button>
                {showExactDays && (
                  <div className="mt-2 max-w-xs">
                    <Input
                      size="sm"
                      type="number"
                      step="1"
                      min="1"
                      max="730"
                      value={rawDays}
                      onChange={(e) => handleDaysText(e.target.value)}
                      placeholder="Ej. 45"
                      aria-label="Duración exacta en días"
                      error={errors.days}
                      helperText={errors.days ? undefined : 'Entre 1 y 730 días.'}
                    />
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-[var(--border-light)] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Meta de ahorro ($)"
                  type="number"
                  step="0.50"
                  min="0.01"
                  value={rawGoal}
                  onChange={(e) => handleGoalText(e.target.value)}
                  error={errors.goal}
                  helperText={errors.goal ? undefined : selected ? `Meta del reto: ${formatCents(selected.goalCents)}` : '¿Cuánto quieres reunir?'}
                  aria-label="Meta de ahorro en dólares"
                />
                <Input
                  label="Fecha de inicio (opcional)"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  error={errors.startDate}
                  helperText={errors.startDate ? undefined : 'Para estimar tu fecha de cierre.'}
                  aria-label="Fecha de inicio del reto"
                />
              </div>
            </div>

            {/* 3 · Resultado principal */}
            <div id={liveRegionId} aria-live="polite" className="p-6 sm:p-8 bg-[var(--off-white)]/60 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[var(--accent)] block mb-3">
                  Ahorro proyectado
                </span>
                <motion.div
                  key={result.accumulatedCents}
                  initial={{ opacity: 0.75, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
                  className="font-mono font-bold text-[clamp(2.4rem,5vw,3.5rem)] text-[var(--text-1)] tracking-tight leading-none mb-3"
                >
                  {formatCents(result.accumulatedCents)}
                </motion.div>
                <p className="text-[0.85rem] text-[var(--text-3)] leading-relaxed">
                  {formatCents(dailyCents)}/día × {result.contributions} aportes · Meta {formatCents(goalCents)}
                </p>
                <div className="mt-6 space-y-2" role="img" aria-label={`${result.compliancePct}% de la meta alcanzado`}>
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-[var(--text-2)]">{result.compliancePct}% de la meta</span>
                    <span className="font-mono font-bold text-[var(--accent)] transition-colors duration-150">
                      {result.remainingCents > 0 ? `Faltan ${formatCents(result.remainingCents)}` : 'Meta alcanzada'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--border-light)] overflow-hidden">
                    <div
                      className="h-full bg-[var(--accent)] rounded-full transition-[width] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                      style={{ width: `${Math.min(result.compliancePct, 100)}%` }}
                    />
                  </div>
                </div>
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-[0.85rem]">
                  <div className="flex justify-between border-b border-[var(--border-light)] pb-2">
                    <dt className="text-[var(--text-3)]">Semanal</dt>
                    <dd className="font-mono font-semibold text-[var(--text-1)]">{formatCents(result.weeklyCents)}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[var(--border-light)] pb-2">
                    <dt className="text-[var(--text-3)]">Mensual</dt>
                    <dd className="font-mono font-semibold text-[var(--text-1)]">{formatCents(result.monthlyCents)}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[var(--border-light)] pb-2">
                    <dt className="text-[var(--text-3)]">Meta al día</dt>
                    <dd className="font-mono font-semibold text-[var(--text-1)]">
                      {result.goalDay !== null ? result.goalDay : '—'}
                    </dd>
                  </div>
                  <div className="flex justify-between border-b border-[var(--border-light)] pb-2">
                    <dt className="text-[var(--text-3)]">Cierre est.</dt>
                    <dd className="font-semibold text-[var(--text-1)] text-right">
                      {result.endDate ? formatDateLong(result.endDate) : '—'}
                    </dd>
                  </div>
                </dl>
                {result.currentDay !== null && result.currentDay > 0 && (
                  <p className="text-[0.82rem] text-[var(--text-3)] mt-4">
                    Calendario: vas en el día {result.currentDay} de {days}. Lo proyectado no es saldo registrado.
                  </p>
                )}
                {hasErrors && (
                  <p className="text-[0.82rem] text-[var(--amber)] mt-4" role="alert">
                    Revisa los campos marcados: los resultados muestran el último valor válido.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 4 · Comparación sin perder contexto */}
          <div className="border-t border-[var(--border-light)] p-6 sm:p-8">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-3)] mb-2">
              Compara las cuatro rutas
            </p>
            <div className="divide-y divide-[var(--border-light)]" role="list">
              {CHALLENGES.map((c) => {
                const isActive = selectedId === c.id;
                const total = simulateSavings({ dailyCents: c.dailyCents, days: c.days, goalCents: c.goalCents });
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="listitem"
                    onClick={() => {
                      selectChallenge(c.id, { dailyCents: c.dailyCents, days: c.days, goalCents: c.goalCents });
                      if (typeof window !== 'undefined') window.history.replaceState(null, '', `#calculadora/${c.id}`);
                    }}
                    aria-pressed={isActive}
                    className={cn(
                      'w-full grid grid-cols-2 sm:grid-cols-12 gap-1 sm:gap-4 py-3.5 text-left cursor-pointer transition-colors',
                      isActive ? 'text-[var(--accent)]' : 'hover:text-[var(--text-1)] text-[var(--text-2)]'
                    )}
                  >
                    <span className="sm:col-span-5 text-[0.92rem] font-semibold text-[var(--text-1)]">
                      {c.name}
                      <span className="block text-[0.72rem] font-semibold uppercase tracking-wider text-[var(--accent)]">{c.level}</span>
                    </span>
                    <span className="sm:col-span-2 font-mono text-[0.85rem] text-right sm:text-left">{formatCents(c.dailyCents)}/d</span>
                    <span className="sm:col-span-2 font-mono text-[0.85rem]">{c.days} días</span>
                    <span className="sm:col-span-3 font-mono text-[0.85rem] font-bold text-right">
                      {formatCents(total.accumulatedCents)}
                      <span className="block font-sans text-[11px] font-normal text-[var(--text-3)]">
                        {isActive ? 'Simulando ahora' : 'Simular →'}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 5 · Acción siguiente */}
            <div className="mt-6 pt-6 border-t border-[var(--border-light)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[0.82rem] text-[var(--text-3)] leading-relaxed max-w-xl text-center sm:text-left">
                Proyección pedagógica: no es dinero garantizado ni registrado. Surcos Saving no es
                un banco ni custodia fondos.
              </p>
              <button
                type="button"
                onClick={handleBackToRoutes}
                className="text-[0.9rem] font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors cursor-pointer shrink-0"
              >
                ← Volver a las rutas formativas
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
