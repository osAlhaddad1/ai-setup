<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight, Check, Landmark, Pencil, ShieldCheck, X, Zap } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import SectionHeading from '@/components/SectionHeading.vue'
import TerminalCard from '@/components/TerminalCard.vue'

const valueProps = [
  {
    icon: ShieldCheck,
    title: 'Data Sovereignty',
    body: '100% on-premise processing. Your data never leaves your local network — eliminating third-party data breaches at the architectural level.',
  },
  {
    icon: Landmark,
    title: 'Predictable Cost Structure',
    body: 'Capital expenditure over operational expenditure. Own the hardware outright — zero recurring API fees, ever.',
  },
  {
    icon: Zap,
    title: 'Zero Latency Operations',
    body: 'Hardware-accelerated local processing removes network bottlenecks and any dependency on external server uptime.',
  },
  {
    icon: Pencil,
    title: 'Unrestricted Customization',
    body: 'Full control over model weights, fine-tuning, and software integration — without vendor lock-in.',
  },
]

const cloudDrawbacks = [
  'Variable per-token costs that scale with usage',
  'Your data transits and rests on third-party servers',
  'Network round-trip latency on every request',
  'Rate limits, deprecations, and vendor lock-in',
  'Downtime when their servers fail — not yours',
]

const localBenefits = [
  'Fixed capital asset — zero recurring API fees',
  'Data never leaves your local network',
  'Hardware-accelerated, zero-latency inference',
  'Full control of model weights and fine-tuning',
  'Runs in your air-gapped or internal network',
]
</script>

<template>
  <!-- Hero -->
  <section class="relative overflow-hidden">
    <div
      class="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl"
      aria-hidden="true"
    />
    <div class="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 lg:grid-cols-[7fr_5fr]">
      <div>
        <span class="mb-4 block font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
          // Sovereign AI Infrastructure
        </span>
        <h1 class="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
          Enterprise AI Infrastructure.
          <span class="text-primary">Entirely On-Premise.</span>
        </h1>
        <p class="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Deploy optimized large language models on custom local hardware. Eliminate cloud
          latency, recurring token fees, and third-party data exposure.
        </p>
        <div class="mt-10 flex flex-wrap gap-4">
          <Button size="lg" as-child>
            <RouterLink to="/calculator">
              See What You'd Save
              <ArrowRight />
            </RouterLink>
          </Button>
          <Button size="lg" variant="outline" as-child>
            <RouterLink to="/fleet">View the Fleet</RouterLink>
          </Button>
        </div>
      </div>
      <TerminalCard />
    </div>
  </section>

  <!-- Value props -->
  <section class="mx-auto max-w-6xl px-6 pb-24">
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card
        v-for="prop in valueProps"
        :key="prop.title"
        class="transition-all hover:-translate-y-1 hover:border-primary/50"
      >
        <CardContent class="p-7">
          <div class="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
            <component :is="prop.icon" class="h-5 w-5 text-primary" />
          </div>
          <h3 class="mb-2 font-semibold text-foreground">{{ prop.title }}</h3>
          <p class="text-sm leading-relaxed text-muted-foreground">{{ prop.body }}</p>
        </CardContent>
      </Card>
    </div>
  </section>

  <!-- Comparison -->
  <section class="border-y bg-card/50">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        kicker="Cloud vs. On-Premise"
        title="Stop Renting Your Intelligence."
        lede="Cloud AI introduces variable operational costs and security vulnerabilities. On-premise deployment converts your AI infrastructure into a fixed, secure capital asset with zero external dependencies."
      />
      <div class="grid gap-6 md:grid-cols-2">
        <Card class="bg-transparent">
          <CardContent class="p-8">
            <h3 class="mb-6 text-lg font-semibold text-foreground">Cloud API Providers</h3>
            <ul class="space-y-4">
              <li
                v-for="item in cloudDrawbacks"
                :key="item"
                class="flex items-start gap-3 text-[15px] text-muted-foreground"
              >
                <X class="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground/60" />
                {{ item }}
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card class="relative border-primary/50">
          <span
            class="absolute -top-3 left-6 rounded bg-primary px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-widest text-primary-foreground"
          >
            IRONNODE
          </span>
          <CardContent class="p-8">
            <h3 class="mb-6 text-lg font-semibold text-foreground">IRONNODE On-Premise</h3>
            <ul class="space-y-4">
              <li
                v-for="item in localBenefits"
                :key="item"
                class="flex items-start gap-3 text-[15px] text-muted-foreground"
              >
                <Check class="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                {{ item }}
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="mx-auto max-w-6xl px-6 py-24 text-center">
    <span class="mb-3 block font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
      // Get Started
    </span>
    <h2 class="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Own Your Inference.</h2>
    <p class="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
      Answer three questions and see how fast a node pays for itself — no spreadsheet required.
    </p>
    <Button size="lg" class="mt-9" as-child>
      <RouterLink to="/calculator">
        Try the Savings Calculator
        <ArrowRight />
      </RouterLink>
    </Button>
  </section>
</template>
