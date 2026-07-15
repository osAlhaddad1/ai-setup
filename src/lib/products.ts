import { TIERS, type Tier } from './tco'

export interface Product {
  slug: string
  tier: Tier
  tagline: string
  blurb: string
  bestFor: string[]
}

export const PRODUCTS: Product[] = [
  {
    slug: 'workstation',
    tier: TIERS[0],
    tagline: 'Serious inference, under a desk.',
    blurb: 'Plugs into a standard wall socket. Serves a whole department the day it arrives.',
    bestFor: ['Teams under 50', 'Chat, writing & internal assistants', 'First step off the cloud'],
  },
  {
    slug: 'rack-unit',
    tier: TIERS[1],
    tagline: 'The workhorse. Most deployed.',
    blurb: 'Four datacenter GPUs in 4U. Heavy inference all day, fine-tuning overnight.',
    bestFor: ['Teams of 50–300', 'RAG over your documents', 'Fine-tuned model variants'],
  },
  {
    slug: 'enterprise-node',
    tier: TIERS[2],
    tagline: 'Training class. No compromises.',
    blurb: 'Eight H200s and a terabyte of HBM3e. Continuous training inside your walls.',
    bestFor: ['Organization-wide load', 'Continuous pre-training', 'Air-gapped estates'],
  },
]

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug)
}

/** Full comparison table — one row per spec, one value per tier. */
export const SPEC_ROWS: { label: string; values: [string, string, string] }[] = [
  { label: 'Target use case', values: ['Inference (<50 concurrent users)', 'Heavy inference & fine-tuning', 'Continuous pre-training & high load'] },
  { label: 'GPU configuration', values: ['2× NVIDIA RTX 4090', '4× NVIDIA L40S', '8× NVIDIA H200'] },
  { label: 'Total VRAM', values: ['48 GB GDDR6X', '192 GB GDDR6', '1,120 GB HBM3e'] },
  { label: 'System RAM', values: ['128 GB DDR5', '512 GB DDR5 ECC', '2,048 GB DDR5 ECC'] },
  { label: 'Storage', values: ['4 TB NVMe SSD', '16 TB NVMe Gen5 RAID', '64 TB NVMe Gen5 RAID'] },
  { label: 'Form factor', values: ['Full-tower desktop', '4U server rack', '8U server rack'] },
  { label: 'Power draw', values: ['1.2 kW', '2.8 kW', '10.2 kW'] },
  { label: 'Weight', values: ['24 kg', '42 kg', '130 kg'] },
  { label: 'Power input', values: ['230V / 16A', '230V / 16A', '380V 3-phase'] },
]

/** Spec rows for a single product, by tier id. */
export function specsFor(tierId: number): { label: string; value: string }[] {
  return SPEC_ROWS.map((row) => ({ label: row.label, value: row.values[tierId - 1] }))
}

export const THUMB_UNITS: Record<number, number> = { 1: 3, 2: 4, 3: 8 }

export function quoteHref(tier: Tier): string {
  const subject = encodeURIComponent(`Quote request — ${tier.name} ${tier.label}`)
  const body = encodeURIComponent(
    `Requested configuration:\n- ${tier.name} ${tier.label}\n\nCompany:\nDeployment timeline:`,
  )
  return `mailto:sales@ironnode.example?subject=${subject}&body=${body}`
}
