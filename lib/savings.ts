/**
 * Surcos Saving — Fuente única de verdad y motor de cálculo del simulador.
 *
 * - Los 4 retos (rutas formativas) viven SOLO aquí. Ningún componente
 *   debe duplicar aporte/duración/meta.
 * - Toda la aritmética monetaria se hace en centavos enteros para evitar
 *   errores de punto flotante. El redondeo ocurre solo en presentación.
 * - La simulación es una PROYECCIÓN (aportes según calendario), no dinero
 *   garantizado ni registrado. Ver tipos `PlannedChallenge` / `LoggedContribution`
 *   para la futura integración con seguimiento real (Fase 5: aún sin backend).
 */

export interface SavingsChallenge {
  id: '5c' | '10c' | '25c' | '50c';
  name: string;
  level: string;
  /** Aporte diario en centavos USD (entero). */
  dailyCents: number;
  /** Duración del reto en días (entero). */
  days: number;
  /** Meta de referencia en centavos USD (entero). */
  goalCents: number;
  objective: string;
}

export const CHALLENGES: readonly SavingsChallenge[] = [
  {
    id: '5c',
    name: 'Reto de 5 centavos',
    level: 'Iniciación',
    dailyCents: 5,
    days: 30,
    goalCents: 150,
    objective: 'Romper la inercia y comprobar que cualquier cantidad cuenta.',
  },
  {
    id: '10c',
    name: 'Reto de 10 centavos',
    level: 'Constancia',
    dailyCents: 10,
    days: 90,
    goalCents: 900,
    objective: 'Sostener el hábito durante un trimestre escolar completo.',
  },
  {
    id: '25c',
    name: 'Reto de 25 centavos',
    level: 'Meta con propósito',
    dailyCents: 25,
    days: 180,
    goalCents: 4500,
    objective: 'Planificar con anticipación un objetivo mediano para el colegio.',
  },
  {
    id: '50c',
    name: 'Reto de 50 centavos',
    level: 'Capital semilla',
    dailyCents: 50,
    days: 365,
    goalCents: 18250,
    objective: 'Reunir capital de trabajo para una idea de negocio estudiantil.',
  },
] as const;

export function getChallengeById(id: string | null | undefined): SavingsChallenge | undefined {
  if (!id) return undefined;
  return CHALLENGES.find((c) => c.id === id);
}

/** Valores iniciales del simulador libre (coinciden con el reto de constancia). */
export const FREE_DEFAULTS = { dailyCents: 10, days: 90, goalCents: 900 } as const;

/** Límites razonables de validación. */
export const LIMITS = {
  dailyCents: { min: 1, max: 10000 }, // $0.01 – $100.00
  days: { min: 1, max: 730 },
  goalCents: { min: 1, max: 10000000 }, // hasta $100,000.00
} as const;

// ─── Motor de cálculo (todo en centavos enteros) ─────────────────────────────

export interface SimulationInput {
  dailyCents: number;
  days: number;
  goalCents: number;
  /** Fecha de inicio ISO (yyyy-mm-dd). Opcional. */
  startDate?: string;
}

export interface SimulationResult {
  dailyCents: number;
  days: number;
  contributions: number;
  accumulatedCents: number;
  goalCents: number;
  /** % de cumplimiento, limitado a [0, 100], con 1 decimal. */
  compliancePct: number;
  remainingCents: number;
  weeklyCents: number;
  monthlyCents: number;
  /** Día (1-based) en que se alcanza la meta, o null si queda fuera del plazo. */
  goalDay: number | null;
  /** Fecha estimada de finalización ISO, o null sin fecha de inicio válida. */
  endDate: string | null;
  /** Día actual del calendario (1-based) según fecha de inicio, o null. */
  currentDay: number | null;
}

function isValidDateISO(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(`${value}T00:00:00`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

function addDaysISO(value: string, days: number): string {
  const d = new Date(`${value}T00:00:00`);
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * A(n) = a·n ; P(n) = min(A/M·100, 100) ; R(n) = max(M−A, 0).
 * Precondición: entradas ya validadas/clampadas a enteros en rango.
 */
export function simulateSavings(input: SimulationInput): SimulationResult {
  const dailyCents = Math.trunc(input.dailyCents);
  const days = Math.trunc(input.days);
  const goalCents = Math.trunc(input.goalCents);

  const accumulatedCents = dailyCents * days;
  const compliancePct =
    goalCents > 0 ? Math.min(100, Math.round((accumulatedCents / goalCents) * 1000) / 10) : 0;
  const remainingCents = Math.max(0, goalCents - accumulatedCents);
  const goalDay =
    dailyCents > 0 ? Math.ceil(goalCents / dailyCents) : null;
  const reachableGoalDay = goalDay !== null && goalDay >= 1 && goalDay <= days ? goalDay : null;

  const startDate = input.startDate && isValidDateISO(input.startDate) ? input.startDate : null;
  const endDate = startDate ? addDaysISO(startDate, days - 1) : null;

  let currentDay: number | null = null;
  if (startDate) {
    const today = todayISO();
    if (today >= startDate) {
      const diffMs = new Date(`${today}T00:00:00`).getTime() - new Date(`${startDate}T00:00:00`).getTime();
      const elapsed = Math.floor(diffMs / 86400000) + 1;
      currentDay = Math.min(Math.max(elapsed, 1), days);
    } else {
      currentDay = 0; // aún no inicia
    }
  }

  return {
    dailyCents,
    days,
    contributions: days,
    accumulatedCents,
    goalCents,
    compliancePct,
    remainingCents,
    weeklyCents: dailyCents * 7,
    monthlyCents: dailyCents * 30,
    goalDay: reachableGoalDay,
    endDate,
    currentDay,
  };
}

// ─── Validación y parseo de entradas ─────────────────────────────────────────

export interface FieldErrors {
  daily?: string;
  days?: string;
  goal?: string;
  startDate?: string;
}

/** Convierte texto de dólares a centavos enteros. NaN si inválido. */
export function parseDollarsToCents(value: string): number {
  const trimmed = value.trim().replace(',', '.');
  if (trimmed === '') return NaN;
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed)) return NaN;
  return Math.round(parsed * 100);
}

export function validateSimulationFields(raw: { daily: string; days: string; goal: string; startDate: string }): FieldErrors {
  const errors: FieldErrors = {};
  const dailyCents = parseDollarsToCents(raw.daily);
  if (Number.isNaN(dailyCents)) errors.daily = 'Ingresa un aporte válido en dólares.';
  else if (dailyCents < LIMITS.dailyCents.min) errors.daily = 'El aporte mínimo es $0.01 al día.';
  else if (dailyCents > LIMITS.dailyCents.max) errors.daily = 'El aporte máximo es $100.00 al día.';

  const days = Number(raw.days);
  if (raw.days.trim() === '' || !Number.isInteger(days)) errors.days = 'Ingresa un número entero de días.';
  else if (days < LIMITS.days.min) errors.days = 'La duración mínima es 1 día.';
  else if (days > LIMITS.days.max) errors.days = 'La duración máxima es 730 días (2 años).';

  const goalCents = parseDollarsToCents(raw.goal);
  if (Number.isNaN(goalCents)) errors.goal = 'Ingresa una meta válida en dólares.';
  else if (goalCents < LIMITS.goalCents.min) errors.goal = 'La meta mínima es $0.01.';
  else if (goalCents > LIMITS.goalCents.max) errors.goal = 'La meta máxima es $100,000.00.';

  if (raw.startDate.trim() !== '' && !isValidDateISO(raw.startDate.trim())) {
    errors.startDate = 'Usa una fecha válida (aaaa-mm-dd).';
  }
  return errors;
}

// ─── Presentación ────────────────────────────────────────────────────────────

export function formatCents(cents: number): string {
  return new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export function formatDateLong(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat('es-EC', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}

// ─── Conexión retos → simulador (misma página, sin backend) ──────────────────

export const SIMULATE_EVENT = 'surcos:simular-reto';

export function challengeHash(id: string): string {
  return `#calculadora/${id}`;
}

/** Extrae el id de reto de hashes como `#calculadora/10c`. */
export function parseChallengeHash(hash: string): string | null {
  const match = hash.match(/^#calculadora\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}

/**
 * Carga un reto en el simulador: actualiza el hash (compartible),
 * notifica a la sección del simulador y desplaza la vista.
 */
export function requestSimulateChallenge(id: string): void {
  if (typeof window === 'undefined') return;
  window.history.replaceState(null, '', challengeHash(id));
  window.dispatchEvent(new CustomEvent<string>(SIMULATE_EVENT, { detail: id }));
  const target = document.querySelector('#calculadora');
  if (target) target.scrollIntoView({ behavior: 'smooth' });
}

// ─── Arquitectura futura: seguimiento real (Fase 5, pendiente de backend) ────
// No existe persistencia, autenticación ni registro de aportes en el proyecto.
// Estos tipos fijan el contrato para no inventar integraciones ficticias.

/** Un reto iniciado por un estudiante (futura persistencia). */
export interface PlannedChallenge {
  id: string;
  challengeId: string;
  startDate: string;
  dailyCents: number;
  days: number;
  goalCents: number;
  status: 'active' | 'completed' | 'abandoned';
}

/** Un aporte efectivamente registrado (futura persistencia). */
export interface LoggedContribution {
  challengeInstanceId: string;
  date: string;
  amountCents: number;
}

/** Dependencias pendientes: backend o store + auth para saldos reales. */
export const TRACKING_PENDING = [
  'Persistencia de retos iniciados (backend o store local con identidad).',
  'Registro de aportes reales por día.',
  'Autenticación de estudiantes para asociar retos y aportes.',
] as const;
