<script setup lang="ts">
import { computed, ref } from 'vue'
import { Coffee, Briefcase, Flame } from 'lucide-vue-next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import SectionHeading from '@/components/SectionHeading.vue'
import {
  AMORTIZATION_MONTHS,
  computeTco,
  DEFAULT_POWER_COST_PER_KWH,
  formatEur,
  recommendTier,
  type UsageLevel,
} from '@/lib/tco'

/* Three plain-language inputs. Everything technical lives under "Advanced". */
const monthlySpend = ref([2500])
const teamSize = ref([40])
const usage = ref<UsageLevel>('regular')

const powerCost = ref(DEFAULT_POWER_COST_PER_KWH)
const capexOverride = ref<number | ''>('')

const usageOptions: { value: UsageLevel; icon: typeof Coffee; title: string; desc: string }[] = [
  {
    value: 'light',
    icon: Coffee,
    title: 'Light',
    desc: 'The occasional email, summary, or question',
  },
  {
    value: 'regular',
    icon: Briefcase,
    title: 'Regular',
    desc: 'Daily writing, research, and customer support',
  },
  {
    value: 'heavy',
    icon: Flame,
    title: 'Heavy',
    desc: 'Document processing, coding, and automation',
  },
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
      kicker="Savings Calculator"
      title="What Would Owning Your AI Save You?"
      lede="Three questions — the same ones you'd answer about any company car or coffee machine. We handle the engineering math."
    />

    <div class="grid gap-8 lg:grid-cols-[7fr_5fr]">
      <!-- Inputs -->
      <Card>
        <CardContent class="space-y-10 p-8">
          <div>
            <div class="mb-1 flex items-baseline justify-between">
              <Label class="text-base text-foreground">
                What does your business spend on AI tools each month?
              </Label>
              <span class="font-mono text-xl font-bold text-primary">
                {{ formatEur(monthlySpend[0]) }}
              </span>
            </div>
            <p class="mb-5 text-sm text-muted-foreground">
              Your monthly invoices from ChatGPT, Claude, Copilot, API providers — added up.
            </p>
            <Slider v-model="monthlySpend" :min="100" :max="30000" :step="100" />
            <div class="mt-2 flex justify-between font-mono text-xs text-muted-foreground">
              <span>€100</span>
              <span>€30,000</span>
            </div>
          </div>

          <div>
            <div class="mb-1 flex items-baseline justify-between">
              <Label class="text-base text-foreground">How many people would use it?</Label>
              <span class="font-mono text-xl font-bold text-primary">{{ teamSize[0] }}</span>
            </div>
            <p class="mb-5 text-sm text-muted-foreground">
              Everyone who touches AI in their job — not just the tech team.
            </p>
            <Slider v-model="teamSize" :min="1" :max="500" :step="1" />
            <div class="mt-2 flex justify-between font-mono text-xs text-muted-foreground">
              <span>1</span>
              <span>500</span>
            </div>
          </div>

          <div>
            <Label class="mb-4 block text-base text-foreground">How heavily do they use it?</Label>
            <div class="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Usage level">
              <button
                v-for="option in usageOptions"
                :key="option.value"
                type="button"
                role="radio"
                :aria-checked="usage === option.value"
                class="rounded-lg border p-4 text-left transition-colors"
                :class="
                  usage === option.value
                    ? 'border-primary bg-primary/10 ring-1 ring-primary'
                    : 'border-border hover:border-primary/40'
                "
                @click="usage = option.value"
              >
                <component
                  :is="option.icon"
                  class="mb-2 h-5 w-5"
                  :class="usage === option.value ? 'text-primary' : 'text-muted-foreground'"
                />
                <div class="text-sm font-semibold text-foreground">{{ option.title }}</div>
                <div class="mt-1 text-xs leading-snug text-muted-foreground">{{ option.desc }}</div>
              </button>
            </div>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="advanced" class="border-b-0">
              <AccordionTrigger class="text-muted-foreground">
                Advanced settings (for your IT team)
              </AccordionTrigger>
              <AccordionContent>
                <div class="grid gap-5 pt-2 sm:grid-cols-2">
                  <div class="space-y-2">
                    <Label for="power-cost">Electricity price (€ / kWh)</Label>
                    <Input id="power-cost" v-model="powerCost" type="number" step="0.01" min="0" />
                  </div>
                  <div class="space-y-2">
                    <Label for="capex">Hardware budget override (€)</Label>
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
        </CardContent>
      </Card>

      <!-- Results -->
      <Card class="h-fit bg-background/60 lg:sticky lg:top-24">
        <CardContent class="space-y-7 p-8" aria-live="polite">
          <div>
            <div class="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              Recommended hardware
            </div>
            <div class="mt-1 text-2xl font-bold text-foreground">
              {{ tier.name }}: {{ tier.label }}
            </div>
            <div class="mt-1 text-sm text-muted-foreground">
              {{ tier.useCase }} · one-time cost ≈ {{ formatEur(result.capex) }}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6 border-y py-6">
            <div>
              <div class="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                You pay today
              </div>
              <div class="mt-1 font-mono text-2xl font-bold text-foreground">
                {{ formatEur(result.monthlyCloud) }}<span class="text-sm font-normal text-muted-foreground">/mo</span>
              </div>
              <div class="mt-1 text-xs text-muted-foreground">forever, and it grows with use</div>
            </div>
            <div>
              <div class="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                Owning it costs
              </div>
              <div class="mt-1 font-mono text-2xl font-bold text-led">
                {{ formatEur(result.monthlyLocal) }}<span class="text-sm font-normal text-muted-foreground">/mo</span>
              </div>
              <div class="mt-1 text-xs text-muted-foreground">
                hardware spread over 3 years + electricity
              </div>
            </div>
          </div>

          <div>
            <div class="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              Pays for itself in
            </div>
            <div class="mt-1 font-mono text-3xl font-bold text-led">
              <template v-if="result.breakEvenMonths !== null">
                {{ result.breakEvenMonths.toFixed(1) }} months
              </template>
              <template v-else>—</template>
            </div>
            <div class="mt-1 text-sm text-muted-foreground">
              <template v-if="result.breakEvenMonths === null">
                At this spend level, cloud is still the cheaper option — talk to us when your bill grows.
              </template>
              <template v-else-if="result.savings36 > 0">
                {{ formatEur(result.savings36) }} kept in your business over 3 years
              </template>
              <template v-else>Breaks even after the 3-year window.</template>
            </div>
            <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div
                class="h-full rounded-full bg-led transition-all duration-500"
                :style="{ width: barWidth + '%' }"
              />
            </div>
          </div>

          <p class="text-xs leading-relaxed text-muted-foreground">
            Estimate based on a 36-month hardware amortization, {{ tier.powerKw }} kW continuous
            power draw, and your electricity price. A site audit gives you exact numbers.
          </p>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
