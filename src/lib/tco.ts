/**
 * Total Cost of Ownership model.
 *
 * Business-owner-friendly inputs (monthly AI bill, team size, usage level)
 * are mapped onto the underlying engineering formulas:
 *
 *   Monthly Local Cost = (Hardware CapEx / 36) + (PowerDraw_kW x 730 x C_kwh)
 *   Break-Even Months  = CapEx / (Monthly Cloud Cost - monthly power cost)
 */

export const AMORTIZATION_MONTHS = 36
export const HOURS_PER_MONTH = 730
export const DEFAULT_POWER_COST_PER_KWH = 0.3

export type UsageLevel = 'light' | 'regular' | 'heavy'

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
    useCase: 'Inference (<50 concurrent users)',
  },
  {
    id: 2,
    name: 'Tier 2',
    label: 'Rack Unit',
    powerKw: 2.8,
    capex: 58_000,
    useCase: 'Heavy Inference & Fine-tuning',
  },
  {
    id: 3,
    name: 'Tier 3',
    label: 'Enterprise Node',
    powerKw: 10.2,
    capex: 340_000,
    useCase: 'Continuous Pre-training & High Load',
  },
]

/** How much load one person at each usage level puts on the node, in
 *  "concurrent-user equivalents". */
const USAGE_WEIGHT: Record<UsageLevel, number> = {
  light: 0.4,
  regular: 1,
  heavy: 2.2,
}

/** Pick the smallest tier that comfortably serves the team. */
export function recommendTier(teamSize: number, usage: UsageLevel): Tier {
  const load = Math.max(0, teamSize) * USAGE_WEIGHT[usage]
  if (load < 50) return TIERS[0]
  if (load < 300) return TIERS[1]
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

  const savings36 =
    monthlyCloud * AMORTIZATION_MONTHS - (capex + monthlyPower * AMORTIZATION_MONTHS)

  return {
    monthlyCloud,
    monthlyPower,
    monthlyAmortization,
    monthlyLocal,
    breakEvenMonths,
    savings36,
    capex,
  }
}

export function formatEur(value: number): string {
  return '€' + Math.round(value).toLocaleString('en-US')
}
