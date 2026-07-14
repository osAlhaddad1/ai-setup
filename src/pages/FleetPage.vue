<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import NextStep from '@/components/NextStep.vue'
import NodeThumb from '@/components/NodeThumb.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { formatEur, TIERS, type Tier } from '@/lib/tco'

const thumbUnits: Record<number, number> = { 1: 3, 2: 4, 3: 8 }

function tierQuoteHref(tier: Tier): string {
  const subject = encodeURIComponent(`Quote request — ${tier.name} ${tier.label}`)
  const body = encodeURIComponent(
    `Requested configuration:\n- ${tier.name} ${tier.label} (${formatEur(tier.capex)})\n\nCompany:\nDeployment timeline:`,
  )
  return `mailto:sales@ironnode.example?subject=${subject}&body=${body}`
}

const specs = [
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

const highlights = [
  ['2× RTX 4090', '48 GB VRAM', '1.2 kW'],
  ['4× L40S', '192 GB VRAM', '2.8 kW'],
  ['8× H200', '1,120 GB VRAM', '10.2 kW'],
]
</script>

<template>
  <section class="mx-auto max-w-6xl px-6 py-20">
    <SectionHeading
      label="01 — Hardware"
      title="Three sizes. One standard."
      lede="Assembled, burned in for 72 hours at full load, delivered ready to run."
    />

    <div class="grid divide-y border md:grid-cols-3 md:divide-x md:divide-y-0">
      <div
        v-for="(tier, index) in TIERS"
        :key="tier.id"
        v-reveal="index * 100"
        class="flex flex-col p-8"
      >
        <div class="flex items-start justify-between gap-4">
          <span class="label-caps">Tier {{ tier.id }}</span>
          <NodeThumb :units="thumbUnits[tier.id]" />
        </div>
        <h3 class="mt-3 text-2xl font-bold text-foreground">{{ tier.label }}</h3>
        <p class="mt-1 text-sm text-muted-foreground">{{ tier.useCase }}</p>
        <ul class="mt-6 space-y-2 text-sm text-foreground">
          <li v-for="line in highlights[index]" :key="line">{{ line }}</li>
        </ul>
        <div class="mt-6 text-sm text-muted-foreground">
          from <span class="font-semibold text-foreground">{{ formatEur(tier.capex) }}</span>
        </div>
        <Button class="mt-6" :variant="tier.id === 2 ? 'default' : 'outline'" as-child>
          <a :href="tierQuoteHref(tier)">Request a quote</a>
        </Button>
      </div>
    </div>

    <h2 class="mb-6 mt-20 text-2xl font-bold text-foreground">Full specifications</h2>
    <div v-reveal class="border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-44" />
            <TableHead v-for="tier in TIERS" :key="tier.id">
              <span class="label-caps block">Tier {{ tier.id }}</span>
              {{ tier.label }}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="spec in specs" :key="spec.label">
            <TableCell class="whitespace-nowrap text-muted-foreground">{{ spec.label }}</TableCell>
            <TableCell v-for="(value, i) in spec.values" :key="i" class="text-foreground">
              {{ value }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </section>

  <NextStep to="/calculator" index="02" title="Pricing & payback" />
</template>
