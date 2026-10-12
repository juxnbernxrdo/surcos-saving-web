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
