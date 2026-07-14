<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import NextStep from '@/components/NextStep.vue'
import ServerRack3D from '@/components/ServerRack3D.vue'
import { effectiveMonthly, formatEur, TIERS } from '@/lib/tco'

const models = ['Llama', 'DeepSeek', 'Mistral', 'Qwen', 'Gemma']

/* One narrative: each chapter pairs a claim with the number that proves it. */
const story = [
  {
    n: '01',
    title: 'Your data stays home',
    body: 'Prompts, documents, and answers never leave your building.',
    stat: '0',
    unit: 'external calls',
  },
  {
    n: '02',
    title: 'The meter stops running',
    body: 'One machine, bought once. The subscription era ends.',
    stat: '€0',
    unit: 'recurring API fees',
  },
  {
    n: '03',
    title: 'Answers arrive instantly',
    body: 'No internet round-trip between a question and its answer.',
    stat: '11 ms',
    unit: 'to first token',
  },
  {
    n: '04',
    title: 'Proven before it ships',
    body: 'Every node survives three days at full load before delivery.',
    stat: '72 h',
    unit: 'burn-in test',
  },
]

const assurances = [
  { title: 'Air-gapped capable', body: 'Runs with zero internet access.' },
  { title: 'Compliance by architecture', body: 'Nothing to audit that never left.' },
  { title: 'Standard APIs', body: 'Your apps reconnect without refactoring.' },
]
</script>

<template>
  <!-- Hero -->
  <section class="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:py-24">
    <div v-reveal>
      <h1 class="text-5xl font-extrabold tracking-tight text-foreground md:text-7xl">
        Enterprise AI.<br />
        Entirely<br />
        on-premise.
      </h1>
      <p class="mt-8 max-w-md text-lg text-muted-foreground">
        Large language models on hardware you own. No token fees, no data exposure, no cloud.
      </p>
      <div class="mt-10 flex flex-wrap items-center gap-6">
        <Button size="lg" as-child>
          <RouterLink to="/calculator">
            See pricing
            <ArrowRight />
          </RouterLink>
        </Button>
        <a
          href="mailto:sales@ironnode.example?subject=Question%20for%20an%20engineer"
          class="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          Talk to an engineer
        </a>
      </div>
    </div>
    <ServerRack3D v-reveal="150" />
  </section>

  <!-- Open models bar -->
  <section class="border-y">
    <div class="mx-auto flex max-w-6xl flex-wrap items-center gap-x-10 gap-y-3 px-6 py-6">
      <span class="label-caps">Runs the open-weight frontier</span>
      <span
        v-for="model in models"
        :key="model"
        class="text-lg font-bold tracking-tight text-muted-foreground"
      >
        {{ model }}
      </span>
    </div>
  </section>

  <!-- Story -->
  <section>
    <div class="mx-auto max-w-6xl px-6 py-24">
      <span v-reveal class="label-caps mb-16 block">What owning changes</span>
      <div class="relative">
        <div class="thread" aria-hidden="true" />
        <ol class="space-y-20">
          <li
            v-for="(chapter, index) in story"
            :key="chapter.n"
            v-reveal="index * 100"
            class="relative grid items-end gap-6 pl-10 sm:grid-cols-[1fr_auto] md:pl-14"
          >
            <span
              class="absolute left-0 top-2 h-[9px] w-[9px] rounded-full bg-foreground"
              aria-hidden="true"
            />
            <div>
              <span class="label-caps">{{ chapter.n }}</span>
              <h3 class="mt-2 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
                {{ chapter.title }}
              </h3>
              <p class="mt-2 max-w-md text-muted-foreground">{{ chapter.body }}</p>
            </div>
            <div class="sm:text-right">
              <div class="text-5xl font-extrabold tracking-tight text-foreground md:text-6xl">
                {{ chapter.stat }}
              </div>
              <div class="mt-1 text-sm text-muted-foreground">{{ chapter.unit }}</div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>

  <!-- The lineup -->
  <section class="border-t">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <span v-reveal class="label-caps mb-10 block">The lineup</span>
      <div class="grid divide-y border md:grid-cols-3 md:divide-x md:divide-y-0">
        <RouterLink
          v-for="(tier, index) in TIERS"
          :key="tier.id"
          v-reveal="index * 100"
          to="/fleet"
          class="group p-8 transition-colors hover:bg-card"
        >
          <span class="label-caps">{{ tier.name }}</span>
          <h3 class="mt-2 text-2xl font-bold text-foreground">{{ tier.label }}</h3>
          <p class="mt-1 text-sm text-muted-foreground">{{ tier.useCase }}</p>
          <div class="mt-6 flex items-center justify-between">
            <div>
              <div class="text-xl font-extrabold text-foreground">{{ formatEur(tier.capex) }}</div>
              <div class="text-xs text-muted-foreground">
                ≈ {{ formatEur(effectiveMonthly(tier)) }}/mo over 36 months
              </div>
            </div>
            <ArrowRight
              class="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1"
            />
          </div>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- Assurances -->
  <section class="border-t">
    <div class="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
      <div v-for="item in assurances" :key="item.title">
        <h3 class="font-bold text-foreground">{{ item.title }}</h3>
        <p class="mt-1 text-sm text-muted-foreground">{{ item.body }}</p>
      </div>
    </div>
  </section>

  <!-- Statement → CTA -->
  <section class="border-t">
    <div class="mx-auto max-w-6xl px-6 pb-16 pt-24">
      <h2 v-reveal class="max-w-3xl text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
        Stop renting your intelligence.
      </h2>
      <p v-reveal="100" class="mt-6 max-w-xl text-lg text-muted-foreground">
        On-premise deployment turns AI from a monthly bill into an asset you own. It starts with
        the right machine.
      </p>
    </div>
  </section>

  <NextStep to="/fleet" index="01" title="The hardware" />
</template>
