<script setup lang="ts">
import NextStep from '@/components/NextStep.vue'
import SectionHeading from '@/components/SectionHeading.vue'

const steps = [
  { title: 'Site audit', body: 'We measure your usage, power, and space.' },
  { title: 'Assembly', body: 'Built, then burn-tested at full load for 72 hours.' },
  { title: 'Installation', body: 'Racked and configured inside your network.' },
  { title: 'Handover', body: 'Your apps reconnect. Your team gets trained.' },
]
</script>

<template>
  <section class="mx-auto max-w-6xl px-6 py-20">
    <SectionHeading label="03 — Process" title="Four steps to handover." />

    <div class="grid divide-y border sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
      <div v-for="(step, index) in steps" :key="step.title" v-reveal="index * 100" class="p-8">
        <div class="text-5xl font-extrabold text-muted-foreground/40">0{{ index + 1 }}</div>
        <h3 class="mt-6 text-lg font-bold text-foreground">{{ step.title }}</h3>
        <p class="mt-2 text-sm text-muted-foreground">{{ step.body }}</p>
      </div>
    </div>
  </section>

  <section class="border-t">
    <div class="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 lg:grid-cols-2">
      <div v-reveal>
        <h2 class="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Zero refactoring.
        </h2>
        <p class="mt-4 max-w-md text-lg text-muted-foreground">
          Your software talks to your node exactly like it talked to the cloud — same REST API,
          different address.
        </p>
      </div>
      <div v-reveal="150" class="overflow-x-auto border bg-card p-6">
        <pre class="font-mono text-[13px] leading-relaxed"><code><span class="text-muted-foreground"># before</span>
<span class="text-foreground">curl https://api.cloud-provider.com/v1/chat/completions</span>

<span class="text-muted-foreground"># after</span>
<span class="text-foreground">curl http://ai-node.internal:8000/v1/chat/completions</span></code></pre>
      </div>
    </div>
  </section>

  <NextStep to="/faq" index="04" title="Questions, answered" />
</template>
