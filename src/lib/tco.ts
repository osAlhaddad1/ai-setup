/**
 * Pricing and payback model.
 *
 * Sales logic: transparent one-time tier prices, a workload-based
 * recommendation, and payback math built on the documented formulas:
 *
 *   Monthly Local Cost = (Hardware CapEx / 36) + (PowerDraw_kW x 730 x C_kwh)
 *   Break-Even Months  = CapEx / (Monthly Cloud Cost - monthly power cost)
 */

export const AMORTIZATION_MONTHS = 36
export const HOURS_PER_MONTH = 730
export const DEFAULT_POWER_COST_PER_KWH = 0.3

export type Workload = 'assist' | 'rag' | 'train'

export interface Tier {
  id: 1 | 2 | 3
  name: string
  label: string
  powerKw: number
  capex: number
  useCase: string
}

export const TIERS: Tier[] = [
  {
    id: 1,
    name: 'Tier 1',
    label: 'Workstation',
    powerKw: 1.2,
    capex: 19_000,
    useCase: 'Inference for teams under 50',
  },
  {
    id: 2,
    name: 'Tier 2',
    label: 'Rack Unit',
    powerKw: 2.8,
    capex: 58_000,
    useCase: 'Heavy inference & fine-tuning',
  },
  {
    id: 3,
    name: 'Tier 3',
    label: 'Enterprise Node',
    powerKw: 10.2,
    capex: 340_000,
    useCase: 'Continuous training & high load',
  },
]

/** Load multiplier per workload, in concurrent-user equivalents per person. */
const WORKLOAD_WEIGHT: Record<Workload, number> = {
  assist: 1,
  rag: 1.6,
  train: 2.5,
}

/**
 * Pick the smallest tier that serves the workload.
 * Fine-tuning needs the Rack Unit's VRAM regardless of team size.
 */
export function recommendTier(teamSize: number, workload: Workload): Tier {
  const load = Math.max(0, teamSize) * WORKLOAD_WEIGHT[workload]
  const minIndex = workload === 'train' ? 1 : 0
  if (load < 50) return TIERS[Math.max(0, minIndex)]
  if (load < 300) return TIERS[Math.max(1, minIndex)]
  return TIERS[2]
}

export interface TcoInput {
  /** What the business pays cloud AI providers today, EUR per month. */
  monthlyCloudSpend: number
  tier: Tier
  powerCostPerKwh?: number
  /** Optional override for the hardware budget, EUR. */
  capexOverride?: number
}

export interface TcoResult {
  monthlyCloud: number
  monthlyPower: number
  monthlyAmortization: number
  monthlyLocal: number
  /** null when the current cloud bill never covers the running costs. */
  breakEvenMonths: number | null
  /** Net savings across the 36-month amortization window. */
  savings36: number
  /** Total spent on cloud over 36 months at today's bill. */
  cloudTotal36: number
  /** Total cost of owning over 36 months: hardware + power. */
  ownedTotal36: number
  /** What inference costs once the hardware has paid for itself. */
  monthlyAfterPayback: number
  capex: number
}

export function computeTco(input: TcoInput): TcoResult {
  const powerCost = input.powerCostPerKwh ?? DEFAULT_POWER_COST_PER_KWH
  const capex = input.capexOverride ?? input.tier.capex
  const monthlyCloud = Math.max(0, input.monthlyCloudSpend)

  const monthlyPower = input.tier.powerKw * HOURS_PER_MONTH * powerCost
  const monthlyAmortization = capex / AMORTIZATION_MONTHS
  const monthlyLocal = monthlyAmortization + monthlyPower

  const netMonthlySavings = monthlyCloud - monthlyPower
  const breakEvenMonths = netMonthlySavings > 0 ? capex / netMonthlySavings : null

  const cloudTotal36 = monthlyCloud * AMORTIZATION_MONTHS
  const ownedTotal36 = capex + monthlyPower * AMORTIZATION_MONTHS

  return {
    monthlyCloud,
    monthlyPower,
    monthlyAmortization,
    monthlyLocal,
    breakEvenMonths,
    savings36: cloudTotal36 - ownedTotal36,
    cloudTotal36,
    ownedTotal36,
    monthlyAfterPayback: monthlyPower,
    capex,
  }
}

/** Effective monthly cost of a tier over 36 months at default power price. */
export function effectiveMonthly(tier: Tier): number {
  return tier.capex / AMORTIZATION_MONTHS + tier.powerKw * HOURS_PER_MONTH * DEFAULT_POWER_COST_PER_KWH
}

export function formatEur(value: number): string {
  return '€' + Math.round(value).toLocaleString('en-US')
}
