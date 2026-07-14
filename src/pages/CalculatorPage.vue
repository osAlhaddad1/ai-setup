<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import NextStep from '@/components/NextStep.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import {
  computeTco,
  DEFAULT_POWER_COST_PER_KWH,
  effectiveMonthly,
  formatEur,
  recommendTier,
  TIERS,
  type Tier,
  type Workload,
} from '@/lib/tco'

/* ---------- Transparent tier pricing ---------- */
const tierSpecs: Record<number, string[]> = {
  1: ['2× NVIDIA RTX 4090', '48 GB VRAM', '128 GB DDR5', 'Full-tower desktop'],
  2: ['4× NVIDIA L40S', '192 GB VRAM', '512 GB DDR5 ECC', '4U server rack'],
  3: ['8× NVIDIA H200', '1,120 GB VRAM', '2,048 GB DDR5 ECC', '8U server rack'],
}

function tierQuoteHref(tier: Tier): string {
  const subject = encodeURIComponent(`Quote request — ${tier.name} ${tier.label}`)
  const body = encodeURIComponent(
    `Requested configuration:\n- ${tier.name} ${tier.label} (${formatEur(tier.capex)})\n\nCompany:\nDeployment timeline:`,
  )
  return `mailto:sales@ironnode.example?subject=${subject}&body=${body}`
}

/* ---------- Payback configurator ---------- */
const workload = ref<Workload>('assist')
const teamSize = ref([40])
const monthlySpend = ref([2500])

const powerCost = ref(DEFAULT_POWER_COST_PER_KWH)
const capexOverride = ref<number | ''>('')

const workloadOptions: { value: Workload; title: string; desc: string }[] = [
  { value: 'assist', title: 'Chat & assistants', desc: 'Writing, support, internal tools' },
  { value: 'rag', title: 'RAG & search', desc: 'Your documents, answered' },
  { value: 'train', title: 'Fine-tuning', desc: 'Your own model variants' },
]

const tier = computed(() => recommendTier(teamSize.value[0], workload.value))

const result = computed(() =>
  computeTco({
    monthlyCloudSpend: monthlySpend.value[0],
    tier: tier.value,
    powerCostPerKwh: Number(powerCost.value) || DEFAULT_POWER_COST_PER_KWH,
    capexOverride: capexOverride.value === '' ? undefined : Number(capexOverride.value),
  }),
)

const barMax = computed(() => Math.max(result.value.cloudTotal36, result.value.ownedTotal36, 1))
const cloudBarPct = computed(() => (result.value.cloudTotal36 / barMax.value) * 100)
const ownedBarPct = computed(() => (result.value.ownedTotal36 / barMax.value) * 100)

const configQuoteHref = computed(() => {
  const t = tier.value
  const w = workloadOptions.find((o) => o.value === workload.value)?.title
  const be = result.value.breakEvenMonths
  const subject = encodeURIComponent(`Quote request — ${t.name} ${t.label}`)
  const body = encodeURIComponent(
    [
      'Requested configuration:',
      `- ${t.name} ${t.label} (${formatEur(result.value.capex)})`,
      `- Workload: ${w}`,
      `- Team size: ${teamSize.value[0]}`,
      `- Current monthly AI spend: ${formatEur(monthlySpend.value[0])}`,
      be !== null ? `- Estimated payback: ${be.toFixed(1)} months` : '',
      '',
      'Company:',
      'Deployment timeline:',
    ].join('\n'),
  )
  return `mailto:sales@ironnode.example?subject=${subject}&body=${body}`
})
</script>

<template>
  <!-- Transparent pricing -->
  <section class="mx-auto max-w-6xl px-6 py-20">
    <SectionHeading
      label="02 — Pricing"
      title="One machine. One invoice."
      lede="Every node ships assembled, burned in, and ready to rack. No metering, no per-seat licenses."
    />

    <div class="grid divide-y border md:grid-cols-3 md:divide-x md:divide-y-0">
      <div v-for="(t, index) in TIERS" :key="t.id" v-reveal="index * 100" class="flex flex-col p-8">
        <div class="flex items-center justify-between gap-4">
          <span class="label-caps">{{ t.name }}</span>
          <span
            v-if="t.id === 2"
            class="bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-primary-foreground"
          >
            Most deployed
          </span>
        </div>
        <h3 class="mt-2 text-2xl font-bold text-foreground">{{ t.label }}</h3>
        <div class="mt-6 text-4xl font-extrabold tracking-tight text-foreground">
          {{ formatEur(t.capex) }}
        </div>
        <div class="mt-1 text-sm text-muted-foreground">
          ≈ {{ formatEur(effectiveMonthly(t)) }}/mo over 36 months, power included
        </div>
        <ul class="mt-6 space-y-2 border-t pt-6 text-sm text-foreground">
          <li v-for="line in tierSpecs[t.id]" :key="line">{{ line }}</li>
        </ul>
        <div class="mt-4 text-sm text-muted-foreground">{{ t.useCase }}</div>
        <Button class="mt-8" :variant="t.id === 2 ? 'default' : 'outline'" as-child>
          <a :href="tierQuoteHref(t)">Request a quote</a>
        </Button>
      </div>
    </div>
    <p class="mt-4 text-xs text-muted-foreground">
      Prices exclude VAT, shipping, and on-site installation.
    </p>
  </section>

  <!-- Payback configurator -->
  <section class="border-t">
    <div class="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading label="Payback" title="When does it pay for itself?" />

      <div class="grid gap-16 lg:grid-cols-2">
        <!-- Inputs -->
        <div class="space-y-12">
          <div>
            <Label class="text-base font-semibold text-foreground">What will it run?</Label>
            <div class="mt-4 grid grid-cols-3 divide-x border" role="radiogroup" aria-label="Workload">
              <button
                v-for="option in workloadOptions"
                :key="option.value"
                type="button"
                role="radio"
                :aria-checked="workload === option.value"
                class="p-4 text-left transition-colors"
                :class="
                  workload === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-card'
                "
                @click="workload = option.value"
              >
                <div class="text-sm font-bold">{{ option.title }}</div>
                <div
                  class="mt-1 text-xs"
                  :class="workload === option.value ? 'text-primary-foreground/70' : 'text-muted-foreground'"
                >
                  {{ option.desc }}
                </div>
              </button>
            </div>
          </div>

          <div>
            <div class="flex items-baseline justify-between gap-4">
              <Label class="text-base font-semibold text-foreground">People using it</Label>
              <span class="text-4xl font-extrabold text-foreground">{{ teamSize[0] }}</span>
            </div>
            <Slider v-model="teamSize" :min="1" :max="500" :step="1" class="mt-6" />
            <div class="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>1</span><span>500</span>
            </div>
          </div>

          <div>
            <div class="flex items-baseline justify-between gap-4">
              <Label class="text-base font-semibold text-foreground">Current monthly AI spend</Label>
              <span class="text-4xl font-extrabold text-foreground">{{ formatEur(monthlySpend[0]) }}</span>
            </div>
            <p class="mt-1 text-sm text-muted-foreground">Your cloud AI invoices, added up.</p>
            <Slider v-model="monthlySpend" :min="100" :max="30000" :step="100" class="mt-6" />
            <div class="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>€100</span><span>€30,000</span>
            </div>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="advanced" class="border-b-0 border-t">
              <AccordionTrigger class="text-sm text-muted-foreground">
                Advanced — for your IT team
              </AccordionTrigger>
              <AccordionContent>
                <div class="grid gap-5 pt-2 sm:grid-cols-2">
                  <div class="space-y-2">
                    <Label for="power-cost">Electricity (€ / kWh)</Label>
                    <Input id="power-cost" v-model="powerCost" type="number" step="0.01" min="0" />
                  </div>
                  <div class="space-y-2">
                    <Label for="capex">Hardware budget (€)</Label>
                    <Input
                      id="capex"
                      v-model="capexOverride"
                      type="number"
                      step="1000"
                      min="0"
                      :placeholder="String(tier.capex)"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <!-- Result -->
        <div class="panel-shadow h-fit border bg-card p-10 lg:sticky lg:top-24" aria-live="polite">
          <div class="flex items-baseline justify-between gap-4">
            <span class="label-caps">Your configuration</span>
            <span class="text-sm font-semibold text-foreground">
              {{ tier.name }} — {{ tier.label }} · {{ formatEur(result.capex) }}
            </span>
          </div>

          <div class="mt-8">
            <span class="label-caps">Pays for itself in</span>
            <div class="mt-2 flex items-baseline gap-3">
              <template v-if="result.breakEvenMonths !== null">
                <span class="text-7xl font-extrabold tracking-tight text-foreground md:text-8xl">
                  {{ result.breakEvenMonths.toFixed(1) }}
                </span>
                <span class="text-2xl font-semibold text-muted-foreground">months</span>
              </template>
              <span v-else class="text-7xl font-extrabold text-muted-foreground">—</span>
            </div>
            <p v-if="result.breakEvenMonths === null" class="mt-2 text-sm text-muted-foreground">
              At this spend, cloud is still cheaper. Talk to us when your bill grows.
            </p>
          </div>

          <div class="mt-10 space-y-5 border-t pt-8">
            <span class="label-caps">Three years, side by side</span>
            <div>
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Keep renting</span>
                <span class="font-semibold text-foreground">{{ formatEur(result.cloudTotal36) }}</span>
              </div>
              <div class="mt-1.5 h-3 bg-secondary">
                <div class="h-full bg-foreground/30 transition-all duration-500" :style="{ width: cloudBarPct + '%' }" />
              </div>
            </div>
            <div>
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Own the node</span>
                <span class="font-semibold text-foreground">{{ formatEur(result.ownedTotal36) }}</span>
              </div>
              <div class="mt-1.5 h-3 bg-secondary">
                <div class="h-full bg-foreground transition-all duration-500" :style="{ width: ownedBarPct + '%' }" />
              </div>
            </div>
            <p class="text-sm text-muted-foreground">
              After payback, inference runs on electricity alone —
              <span class="font-semibold text-foreground">{{ formatEur(result.monthlyAfterPayback) }}/month</span>.
            </p>
          </div>

          <Button size="lg" class="mt-10 w-full" as-child>
            <a :href="configQuoteHref">
              Request a quote for {{ tier.name }}
              <ArrowRight />
            </a>
          </Button>
          <p class="mt-4 text-xs text-muted-foreground">
            Estimate: 36-month amortization, {{ tier.powerKw }} kW draw, your electricity price.
          </p>
        </div>
      </div>
    </div>
  </section>

  <NextStep to="/deployment" index="03" title="How deployment works" />
</template>
