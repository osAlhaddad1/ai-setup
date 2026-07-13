import { describe, expect, it } from 'vitest'
import {
  AMORTIZATION_MONTHS,
  computeTco,
  formatEur,
  HOURS_PER_MONTH,
  recommendTier,
  TIERS,
} from '../tco'

describe('recommendTier', () => {
  it('recommends the workstation for a small team', () => {
    expect(recommendTier(10, 'regular').id).toBe(1)
  })

  it('recommends the rack unit once load crosses 50 concurrent-user equivalents', () => {
    expect(recommendTier(50, 'regular').id).toBe(2)
    expect(recommendTier(25, 'heavy').id).toBe(2) // 25 x 2.2 = 55
  })

  it('keeps light users on the workstation longer', () => {
    expect(recommendTier(100, 'light').id).toBe(1) // 100 x 0.4 = 40
  })

  it('recommends the enterprise node for heavy large teams', () => {
    expect(recommendTier(200, 'heavy').id).toBe(3) // 200 x 2.2 = 440
  })

  it('never returns a tier below 1 for zero or negative team sizes', () => {
    expect(recommendTier(0, 'heavy').id).toBe(1)
    expect(recommendTier(-5, 'heavy').id).toBe(1)
  })
})

describe('computeTco', () => {
  const tier2 = TIERS[1]

  it('matches the documented formulas for the reference scenario', () => {
    // €7,200/mo cloud spend on a Tier 2 node at €0.30/kWh
    const result = computeTco({
      monthlyCloudSpend: 7200,
      tier: tier2,
      powerCostPerKwh: 0.3,
    })

    // Power: 2.8 kW x 730 h x €0.30 = €613.20
    expect(result.monthlyPower).toBeCloseTo(613.2, 2)
    // Local: 58,000/36 + 613.20 = €2,224.31
    expect(result.monthlyLocal).toBeCloseTo(58000 / 36 + 613.2, 2)
    // Break-even: 58,000 / (7,200 - 613.20) = 8.805 months
    expect(result.breakEvenMonths).toBeCloseTo(8.805, 2)
    // 36-month savings: 7,200x36 - (58,000 + 613.20x36) = €179,124.80
    expect(result.savings36).toBeCloseTo(179124.8, 1)
  })

  it('returns null break-even when cloud spend never covers running power costs', () => {
    const result = computeTco({
      monthlyCloudSpend: 500,
      tier: TIERS[2], // 10.2 kW -> €2,233.80/mo power at €0.30
      powerCostPerKwh: 0.3,
    })
    expect(result.breakEvenMonths).toBeNull()
    expect(result.savings36).toBeLessThan(0)
  })

  it('honours a CapEx override', () => {
    const result = computeTco({
      monthlyCloudSpend: 7200,
      tier: tier2,
      powerCostPerKwh: 0.3,
      capexOverride: 36_000,
    })
    expect(result.capex).toBe(36_000)
    expect(result.monthlyAmortization).toBeCloseTo(1000, 5)
  })

  it('clamps negative cloud spend to zero', () => {
    const result = computeTco({ monthlyCloudSpend: -100, tier: tier2 })
    expect(result.monthlyCloud).toBe(0)
    expect(result.breakEvenMonths).toBeNull()
  })

  it('uses the documented constants', () => {
    expect(AMORTIZATION_MONTHS).toBe(36)
    expect(HOURS_PER_MONTH).toBe(730)
  })
})

describe('formatEur', () => {
  it('rounds and adds thousands separators', () => {
    expect(formatEur(179124.8)).toBe('€179,125')
    expect(formatEur(0)).toBe('€0')
  })
})
