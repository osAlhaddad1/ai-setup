<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import NextStep from '@/components/NextStep.vue'
import ServerRack3D from '@/components/ServerRack3D.vue'

const stats = [
  { value: '€0', label: 'recurring API fees' },
  { value: '0', label: 'external calls' },
  { value: '11 ms', label: 'first token' },
  { value: '72 h', label: 'burn-in test' },
]

const principles = [
  { n: '01', title: 'Data sovereignty', body: 'Your data never leaves your building.' },
  { n: '02', title: 'Fixed cost', body: 'Own the hardware. No monthly fees.' },
  { n: '03', title: 'Zero latency', body: 'No network round-trips.' },
  { n: '04', title: 'Full control', body: 'Your models. Your weights.' },
]
</script>

<template>
  <!-- Hero -->
  <section class="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:py-28">
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
          <RouterLink to="/fleet">
            Explore the hardware
            <ArrowRight />
          </RouterLink>
        </Button>
        <RouterLink
          to="/calculator"
          class="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          Calculate your savings
        </RouterLink>
      </div>
    </div>
    <ServerRack3D v-reveal="150" />
  </section>

  <!-- Stat band -->
  <section class="border-y">
    <div class="mx-auto grid max-w-6xl grid-cols-2 divide-x md:grid-cols-4">
      <div v-for="stat in stats" :key="stat.label" class="px-6 py-8">
        <div class="text-3xl font-extrabold text-foreground md:text-4xl">{{ stat.value }}</div>
        <div class="mt-1 text-sm text-muted-foreground">{{ stat.label }}</div>
      </div>
    </div>
  </section>

  <!-- Principles -->
  <section class="mx-auto max-w-6xl px-6 py-24">
    <div class="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="(item, index) in principles" :key="item.n" v-reveal="index * 100">
        <span class="label-caps">{{ item.n }}</span>
        <h3 class="mt-3 text-lg font-bold text-foreground">{{ item.title }}</h3>
        <p class="mt-2 text-sm text-muted-foreground">{{ item.body }}</p>
      </div>
    </div>
  </section>

  <!-- Statement -->
  <section class="border-t">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <h2 v-reveal class="max-w-3xl text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
        Stop renting your intelligence.
      </h2>
      <p v-reveal="100" class="mt-6 max-w-xl text-lg text-muted-foreground">
        On-premise deployment turns AI from a monthly bill into an asset you own.
      </p>
    </div>
  </section>

  <NextStep to="/fleet" index="01" title="The hardware" />
</template>
