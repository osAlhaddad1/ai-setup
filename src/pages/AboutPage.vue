<script setup lang="ts">
import NextStep from '@/components/NextStep.vue'
import SectionHeading from '@/components/SectionHeading.vue'

const values = [
  {
    title: 'Own the stack',
    body: 'We believe intelligence infrastructure belongs on your balance sheet, not your expense report.',
  },
  {
    title: 'Ship proven machines',
    body: 'Nothing leaves our workshop before 72 hours at full load. Boring hardware is good hardware.',
  },
  {
    title: 'Stay reachable',
    body: 'Every deployment comes with an engineer you can call. No ticket queues.',
  },
]

const facts = [
  { stat: '3', unit: 'hardware tiers' },
  { stat: '72 h', unit: 'burn-in, every node' },
  { stat: '0', unit: 'external dependencies' },
]
</script>

<template>
  <section class="mx-auto max-w-6xl px-6 py-20">
    <SectionHeading
      label="Company"
      title="Built where your data lives."
      lede="IRONNODE builds and installs on-premise AI infrastructure. We put open models on machines you own, inside networks you control."
    />

    <div class="glass grid divide-y border md:grid-cols-3 md:divide-x md:divide-y-0">
      <div v-for="(value, index) in values" :key="value.title" v-reveal="index * 100" class="p-8">
        <h3 class="font-bold text-foreground">{{ value.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ value.body }}</p>
      </div>
    </div>

    <div class="mt-16 grid gap-10 sm:grid-cols-3">
      <div v-for="fact in facts" :key="fact.unit">
        <div class="text-5xl font-extrabold tracking-tight text-foreground">{{ fact.stat }}</div>
        <div class="mt-1 text-sm text-muted-foreground">{{ fact.unit }}</div>
      </div>
    </div>
  </section>

  <NextStep to="/careers" index="Careers" title="Work with us" />
</template>
