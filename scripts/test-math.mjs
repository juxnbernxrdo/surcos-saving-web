import assert from 'node:assert';

// 1. Savings Calculator Formula Test
function calculateSavings(daily, days) {
  return Number((daily * days).toFixed(2));
}

// 2. Entrepreneurship Calculator Formula Test
function calculateEntrepreneurship(
  unitPrice,
  unitsSold,
  unitCost,
  fixedCosts
) {
  const grossRevenue = Number((unitPrice * unitsSold).toFixed(2));
  const variableCosts = Number((unitCost * unitsSold).toFixed(2));
  const totalCosts = Number((variableCosts + fixedCosts).toFixed(2));
  const estimatedProfit = Number((grossRevenue - totalCosts).toFixed(2));
  const marginPercent = grossRevenue > 0
    ? Number(((estimatedProfit / grossRevenue) * 100).toFixed(1))
    : 0;
  const breakEvenUnits = unitPrice > unitCost
    ? Math.ceil(fixedCosts / (unitPrice - unitCost))
    : 0;

  return {
    grossRevenue,
    variableCosts,
    totalCosts,
    estimatedProfit,
    marginPercent,
    breakEvenUnits,
  };
}

console.log('Running Surcos Saving Math Verifications...');

// Verify prompt table
const testTable = [
  { daily: 0.05, d30: 1.50, d90: 4.50, d365: 18.25 },
  { daily: 0.10, d30: 3.00, d90: 9.00, d365: 36.50 },
  { daily: 0.15, d30: 4.50, d90: 13.50, d365: 54.75 },
  { daily: 0.25, d30: 7.50, d90: 22.50, d365: 91.25 },
  { daily: 0.50, d30: 15.00, d90: 45.00, d365: 182.50 },
];

for (const row of testTable) {
  assert.strictEqual(calculateSavings(row.daily, 30), row.d30, `Failed for ${row.daily} x 30`);
  assert.strictEqual(calculateSavings(row.daily, 90), row.d90, `Failed for ${row.daily} x 90`);
  assert.strictEqual(calculateSavings(row.daily, 365), row.d365, `Failed for ${row.daily} x 365`);
}
console.log('✓ All 15 savings table scenarios passed exactly.');

// Test entrepreneurship math with realistic student fair numbers:
// 25 items at $2.50, cost $1.00 each, $5 fixed costs
const fairResult = calculateEntrepreneurship(2.50, 25, 1.00, 5.00);
assert.strictEqual(fairResult.grossRevenue, 62.50);
assert.strictEqual(fairResult.variableCosts, 25.00);
assert.strictEqual(fairResult.totalCosts, 30.00);
assert.strictEqual(fairResult.estimatedProfit, 32.50);
assert.strictEqual(fairResult.marginPercent, 52.0);
assert.strictEqual(fairResult.breakEvenUnits, 4); // $5 / ($2.50 - $1.00) = 3.33 -> 4 units
console.log('✓ Entrepreneurship math passed with breakeven verification.');

console.log('All tests passed successfully!');

// 3. Savings engine (lib/savings.ts mirror): integer cents, exact reference goals
const CHALLENGES = [
  { id: '5c', dailyCents: 5, days: 30, goalCents: 150 },
  { id: '10c', dailyCents: 10, days: 90, goalCents: 900 },
  { id: '25c', dailyCents: 25, days: 180, goalCents: 4500 },
  { id: '50c', dailyCents: 50, days: 365, goalCents: 18250 },
];

function simulateCents(dailyCents, days, goalCents) {
  const accumulated = dailyCents * days; // A(n) = a·n, exact in integers
  const compliance = goalCents > 0 ? Math.min(100, Math.round((accumulated / goalCents) * 1000) / 10) : 0;
  const remaining = Math.max(0, goalCents - accumulated); // R(n) = max(M−A, 0)
  const goalDay = dailyCents > 0 ? Math.ceil(goalCents / dailyCents) : null;
  return { accumulated, compliance, remaining, goalDay };
}

for (const c of CHALLENGES) {
  const r = simulateCents(c.dailyCents, c.days, c.goalCents);
  assert.strictEqual(r.accumulated, c.goalCents, `Reto ${c.id}: A(n) debe igualar la meta exacta`);
  assert.strictEqual(r.compliance, 100, `Reto ${c.id}: cumplimiento debe ser 100%`);
  assert.strictEqual(r.remaining, 0, `Reto ${c.id}: restante debe ser 0`);
  assert.ok(r.goalDay !== null && r.goalDay <= c.days, `Reto ${c.id}: meta alcanzable dentro del plazo`);
}
// Partial progress + caps
const partial = simulateCents(10, 45, 900);
assert.strictEqual(partial.accumulated, 450);
assert.strictEqual(partial.compliance, 50);
assert.strictEqual(partial.remaining, 450);
const over = simulateCents(50, 365, 900);
assert.strictEqual(over.compliance, 100, 'Cumplimiento limitado a 100');
assert.strictEqual(over.remaining, 0, 'Restante nunca negativo');
const zeroGoal = simulateCents(10, 30, 0);
assert.strictEqual(zeroGoal.compliance, 0, 'Sin división entre cero');
console.log('✓ Savings engine: 4 metas exactas, cumplimiento, restante y día de meta verificados.');

console.log('All simulator checks passed successfully!');
