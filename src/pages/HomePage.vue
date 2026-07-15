<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import NextStep from '@/components/NextStep.vue'
import NodeThumb from '@/components/NodeThumb.vue'
import ServerRack3D from '@/components/ServerRack3D.vue'
import { PRODUCTS, THUMB_UNITS } from '@/lib/products'
import { effectiveMonthly, formatEur } from '@/lib/tco'

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

const included = [
  {
    q: 'OpenAI-compatible API',
    a: 'Your existing apps point at a new URL and keep working. No SDK changes, no refactoring, no retraining your developers.',
  },
  {
    q: 'RAG on your documents',
    a: 'A local vector stack — Qdrant, Milvus, or pgvector — plus embedding models. Retrieval runs entirely inside your network.',
  },
  {
    q: 'Survives GPU failure',
    a: 'Multi-GPU tiers reroute inference to the remaining cards at reduced throughput until the replacement arrives. No outage.',
  },
  {
    q: 'Updates without drama',
    a: 'Models live in containers. Pull new weights, restart the container, done. New architectures need no new hardware.',
  },
]

const security = [
  { title: 'Air-gapped capable', body: 'Runs with zero internet access.' },
  { title: 'Zero external calls', body: 'Nothing to intercept in transit.' },
  { title: 'Compliance by architecture', body: 'Data that never leaves needs no transfer agreements.' },
  { title: 'Your keys, your building', body: 'Physical access is your access policy.' },
]

const process = [
  { n: '01', title: 'Audit', body: 'We size your workload, power, and space.' },
  { n: '02', title: 'Install', body: 'Racked and configured inside your network.' },
  { n: '03', title: 'Own', body: 'Your apps reconnect. Your team gets trained.' },
]
</script>

<template>
  <!-- Hero -->
  <section class="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:py-24">
    <div v-reveal>
      <RouterLink
        to="/hardware/enterprise-node"
        class="group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
      >
        <span class="font-bold text-foreground">New</span>
        Enterprise Node — 8× H200, 1.1 TB VRAM
        <ArrowRight class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </RouterLink>
      <h1 class="mt-6 text-5xl font-extrabold tracking-tight text-foreground md:text-7xl">
        Enterprise AI.<br />
        <span class="text-muted-foreground/70">Entirely on-premise.</span>
      </h1>
      <p class="mt-8 max-w-md text-lg text-muted-foreground">
        Large language models on hardware you own. No token fees, no data exposure, no cloud.
      </p>
      <div class="mt-10 flex flex-wrap items-center gap-4">
        <Button size="lg" as-child>
          <RouterLink to="/pricing">
            See pricing
            <ArrowRight />
          </RouterLink>
        </Button>
        <Button size="lg" variant="outline" as-child>
          <a href="mailto:sales@ironnode.example?subject=Question%20for%20an%20engineer">
            Talk to an engineer
          </a>
        </Button>
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
      <span v-reveal class="label-caps mb-12 block">What owning changes</span>
      <div class="relative">
        <div class="thread-x" aria-hidden="true" />
        <div class="grid divide-y lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          <div
            v-for="(chapter, index) in story"
            :key="chapter.n"
            v-reveal="index * 100"
            class="px-0 py-10 lg:px-8 lg:first:pl-0 lg:last:pr-0"
          >
            <span class="label-caps">{{ chapter.n }}</span>
            <div class="mt-6 text-5xl font-extrabold tracking-tight text-foreground">
              {{ chapter.stat }}
            </div>
            <div class="mt-1 text-sm text-muted-foreground">{{ chapter.unit }}</div>
            <h3 class="mt-6 font-bold text-foreground">{{ chapter.title }}</h3>
            <p class="mt-1 text-sm text-muted-foreground">{{ chapter.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- The lineup -->
  <section class="border-t">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <div v-reveal class="mb-12 max-w-2xl">
        <span class="label-caps mb-4 block">The lineup</span>
        <h2 class="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          One lineup. Every scale.
        </h2>
        <p class="mt-4 text-lg text-muted-foreground">
          From a node under a desk to a training-class machine in your rack.
        </p>
      </div>
      <div class="glass grid divide-y border md:grid-cols-3 md:divide-x md:divide-y-0">
        <div
          v-for="(product, index) in PRODUCTS"
          :key="product.slug"
          v-reveal="index * 100"
          class="flex flex-col p-8"
        >
          <div class="flex items-start justify-between gap-4">
            <span class="label-caps">{{ product.tier.name }}</span>
            <NodeThumb :units="THUMB_UNITS[product.tier.id]" />
          </div>
          <h3 class="mt-2 text-2xl font-bold text-foreground">{{ product.tier.label }}</h3>
          <p class="mt-1 text-sm text-muted-foreground">{{ product.tagline }}</p>
          <div class="mt-6">
            <div class="text-xl font-extrabold text-foreground">{{ formatEur(product.tier.capex) }}</div>
            <div class="text-xs text-muted-foreground">
              ≈ {{ formatEur(effectiveMonthly(product.tier)) }}/mo over 36 months
            </div>
          </div>
          <div class="mt-6 flex items-center gap-5 border-t pt-5">
            <RouterLink
              :to="`/hardware/${product.slug}`"
              class="group inline-flex items-center gap-1.5 text-sm font-semibold text-foreground"
            >
              View product
              <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </RouterLink>
            <RouterLink
              to="/pricing"
              class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Everything included -->
  <section class="border-t">
    <div class="mx-auto grid max-w-6xl gap-14 px-6 py-24 lg:grid-cols-[5fr_7fr]">
      <div v-reveal>
        <span class="label-caps mb-4 block">In the box</span>
        <h2 class="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Everything included.
        </h2>
        <p class="mt-4 max-w-sm text-lg text-muted-foreground">
          The machine arrives as a working AI platform, not a parts list.
        </p>
      </div>
      <Accordion v-reveal="100" type="single" collapsible class="glass h-fit border px-6">
        <AccordionItem v-for="item in included" :key="item.q" :value="item.q">
          <AccordionTrigger class="py-5 text-base">{{ item.q }}</AccordionTrigger>
          <AccordionContent class="text-[15px]">{{ item.a }}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </section>

  <!-- Security -->
  <section class="border-t">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <div v-reveal class="mb-12 max-w-2xl">
        <span class="label-caps mb-4 block">Security</span>
        <h2 class="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Secure by absence.
        </h2>
        <p class="mt-4 text-lg text-muted-foreground">
          The strongest security control is a wire that was never connected.
        </p>
      </div>
      <div class="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(item, index) in security"
          :key="item.title"
          v-reveal="index * 80"
          class="glass p-7"
        >
          <h3 class="font-bold text-foreground">{{ item.title }}</h3>
          <p class="mt-1.5 text-sm text-muted-foreground">{{ item.body }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Process strip -->
  <section class="border-t">
    <div class="mx-auto max-w-6xl px-6 py-16">
      <div class="grid items-center gap-10 lg:grid-cols-[auto_1fr]">
        <div class="grid gap-10 sm:grid-cols-3 lg:gap-14">
          <div v-for="step in process" :key="step.n">
            <span class="label-caps">{{ step.n }}</span>
            <h3 class="mt-2 text-xl font-bold text-foreground">{{ step.title }}</h3>
            <p class="mt-1 text-sm text-muted-foreground">{{ step.body }}</p>
          </div>
        </div>
        <RouterLink
          to="/deployment"
          class="group inline-flex items-center gap-2 text-sm font-semibold text-foreground lg:justify-self-end"
        >
          See the full process
          <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="border-t">
    <div class="mx-auto max-w-6xl px-6 py-28 text-center">
      <h2 v-reveal class="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
        Stop renting your intelligence.
      </h2>
      <p v-reveal="100" class="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
        On-premise deployment turns AI from a monthly bill into an asset you own.
      </p>
      <div v-reveal="200" class="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button size="lg" as-child>
          <RouterLink to="/pricing">
            See pricing
            <ArrowRight />
          </RouterLink>
        </Button>
        <Button size="lg" variant="outline" as-child>
          <a href="mailto:sales@ironnode.example?subject=Talk%20to%20an%20engineer">
            Talk to an engineer
          </a>
        </Button>
      </div>
    </div>
  </section>

  <NextStep to="/hardware" index="01" title="The hardware" />
</template>
