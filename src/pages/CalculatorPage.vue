<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
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
  AMORTIZATION_MONTHS,
  computeTco,
  DEFAULT_POWER_COST_PER_KWH,
  formatEur,
  recommendTier,
  type UsageLevel,
} from '@/lib/tco'

const monthlySpend = ref([2500])
const teamSize = ref([40])
const usage = ref<UsageLevel>('regular')

const powerCost = ref(DEFAULT_POWER_COST_PER_KWH)
const capexOverride = ref<number | ''>('')

const usageOptions: { value: UsageLevel; title: string; desc: string }[] = [
  { value: 'light', title: 'Light', desc: 'Occasional emails & questions' },
  { value: 'regular', title: 'Regular', desc: 'Daily writing & support' },
  { value: 'heavy', title: 'Heavy', desc: 'Documents, code, automation' },
]

const tier = computed(() => recommendTier(teamSize.value[0], usage.value))

const result = computed(() =>
  computeTco({
    monthlyCloudSpend: monthlySpend.value[0],
    tier: tier.value,
    powerCostPerKwh: Number(powerCost.value) || DEFAULT_POWER_COST_PER_KWH,
    capexOverride: capexOverride.value === '' ? undefined : Number(capexOverride.value),
  }),
)

const barWidth = computed(() => {
  const be = result.value.breakEvenMonths
  if (be === null) return 0
  return Math.max(0, Math.min(100, (1 - be / AMORTIZATION_MONTHS) * 100))
})
</script>

<template>
  <section class="mx-auto max-w-6xl px-6 py-20">
    <SectionHeading
      label="02 — Savings"
      title="What would owning save you?"
      lede="Three questions. No spreadsheet."
    />

    <div class="grid gap-16 lg:grid-cols-2">
      <!-- Inputs -->
      <div class="space-y-12">
        <div>
          <div class="flex items-baseline justify-between gap-4">
            <Label class="text-base font-semibold text-foreground">Monthly AI spend</Label>
            <span class="text-4xl font-extrabold text-foreground">{{ formatEur(monthlySpend[0]) }}</span>
          </div>
          <p class="mt-1 text-sm text-muted-foreground">
            Everything you pay OpenAI, Anthropic, Copilot &amp; co. per month.
          </p>
          <Slider v-model="monthlySpend" :min="100" :max="30000" :step="100" class="mt-6" />
          <div class="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>€100</span><span>€30,000</span>
          </div>
        </div>

        <div>
          <div class="flex items-baseline justify-between gap-4">
            <Label class="text-base font-semibold text-foreground">People using AI</Label>
            <span class="text-4xl font-extrabold text-foreground">{{ teamSize[0] }}</span>
          </div>
          <Slider v-model="teamSize" :min="1" :max="500" :step="1" class="mt-6" />
          <div class="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>1</span><span>500</span>
          </div>
        </div>

        <div>
          <Label class="text-base font-semibold text-foreground">How heavily?</Label>
          <div class="mt-4 grid grid-cols-3 divide-x border" role="radiogroup" aria-label="Usage level">
            <button
              v-for="option in usageOptions"
              :key="option.value"
              type="button"
              role="radio"
              :aria-checked="usage === option.value"
              class="p-4 text-left transition-colors"
              :class="
                usage === option.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-card'
              "
              @click="usage = option.value"
            >
              <div class="font-bold">{{ option.title }}</div>
              <div
                class="mt-1 text-xs"
                :class="usage === option.value ? 'text-primary-foreground/70' : 'text-muted-foreground'"
              >
                {{ option.desc }}
              </div>
            </button>
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
      <div class="h-fit border bg-card p-10 lg:sticky lg:top-24" aria-live="polite">
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
        <div class="mt-4 h-1 bg-secondary">
          <div class="h-full bg-foreground transition-all duration-500" :style="{ width: barWidth + '%' }" />
        </div>
        <p class="mt-3 text-sm text-muted-foreground">
          <template v-if="result.breakEvenMonths === null">
            At this spend, cloud is still cheaper. Talk to us when your bill grows.
          </template>
          <template v-else-if="result.savings36 > 0">
            <span class="font-semibold text-foreground">{{ formatEur(result.savings36) }}</span>
            kept in your business over 3 years.
          </template>
          <template v-else>Breaks even after the 3-year window.</template>
        </p>

        <div class="mt-10 grid grid-cols-2 gap-8 border-t pt-8">
          <div>
            <span class="label-caps">You pay today</span>
            <div class="mt-1 text-3xl font-extrabold text-foreground">
              {{ formatEur(result.monthlyCloud) }}
            </div>
            <div class="text-sm text-muted-foreground">per month, forever</div>
          </div>
          <div>
            <span class="label-caps">Owning costs</span>
            <div class="mt-1 text-3xl font-extrabold text-foreground">
              {{ formatEur(result.monthlyLocal) }}
            </div>
            <div class="text-sm text-muted-foreground">per month, 3-year basis</div>
          </div>
        </div>

        <RouterLink
          :to="'/fleet'"
          class="group mt-8 flex items-center justify-between border-t pt-6 text-sm"
        >
          <span class="text-muted-foreground">
            Recommended:
            <span class="font-semibold text-foreground">Tier {{ tier.id }} — {{ tier.label }}</span>
          </span>
          <ArrowRight class="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </RouterLink>

        <Button size="lg" class="mt-8 w-full" as-child>
          <a href="mailto:audit@ironnode.example?subject=Site%20Audit%20Request">Book a site audit</a>
        </Button>
        <p class="mt-4 text-xs text-muted-foreground">
          Estimate: 36-month amortization, {{ tier.powerKw }} kW draw, your electricity price.
        </p>
      </div>
    </div>
  </section>

  <NextStep to="/deployment" index="03" title="How deployment works" />
</template>
