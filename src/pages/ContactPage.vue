<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import NextStep from '@/components/NextStep.vue'
import SectionHeading from '@/components/SectionHeading.vue'

const channels = [
  {
    title: 'Sales',
    body: 'Sizing, quotes, and site audits.',
    href: 'mailto:sales@ironnode.example?subject=Quote%20request',
    action: 'sales@ironnode.example',
  },
  {
    title: 'Engineering',
    body: 'Technical questions before you commit.',
    href: 'mailto:sales@ironnode.example?subject=Talk%20to%20an%20engineer',
    action: 'Talk to an engineer',
  },
  {
    title: 'Careers',
    body: 'Applications and open pitches.',
    href: 'mailto:careers@ironnode.example',
    action: 'careers@ironnode.example',
  },
]
</script>

<template>
  <section class="mx-auto max-w-6xl px-6 py-20">
    <SectionHeading label="Contact" title="Talk to a human." lede="One office. No ticket queues." />

    <div class="glass grid divide-y border md:grid-cols-3 md:divide-x md:divide-y-0">
      <a
        v-for="(channel, index) in channels"
        :key="channel.title"
        v-reveal="index * 100"
        :href="channel.href"
        class="group p-8 transition-colors hover:bg-white/50"
      >
        <h3 class="font-bold text-foreground">{{ channel.title }}</h3>
        <p class="mt-2 text-sm text-muted-foreground">{{ channel.body }}</p>
        <span
          class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground"
        >
          {{ channel.action }}
          <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </a>
    </div>

    <p class="mt-8 text-sm text-muted-foreground">IRONNODE B.V. — Rotterdam, The Netherlands.</p>
  </section>

  <NextStep to="/pricing" index="02" title="Pricing & payback" />
</template>
