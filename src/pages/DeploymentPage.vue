<script setup lang="ts">
import { ref } from 'vue'
import { Check } from 'lucide-vue-next'
import NextStep from '@/components/NextStep.vue'
import SectionHeading from '@/components/SectionHeading.vue'

const timeline = [
  { stat: '4–6 wks', unit: 'from signed quote to running node' },
  { stat: '72 h', unit: 'full-load burn-in before shipping' },
  { stat: '1', unit: 'site visit for installation' },
]

const steps = [
  {
    n: '01',
    title: 'Site audit & sizing',
    body: 'We measure your current API volume, concurrency, power, cooling, and rack space — then size the node to the workload, not the other way around.',
    duration: '~1 week',
    deliverable: 'Sizing report & fixed quote',
  },
  {
    n: '02',
    title: 'Assembly & burn-in',
    body: 'Your node is built and then tortured: 72 hours of continuous full load to surface thermal and component failures in our workshop, not your server room.',
    duration: '2–3 weeks',
    deliverable: 'Burn-in test report',
  },
  {
    n: '03',
    title: 'On-site installation',
    body: 'Rack mounting, network configuration, and bare-metal OS install — inside your air-gapped or internal network. We bring the tools.',
    duration: '1–2 days',
    deliverable: 'A running node on your LAN',
  },
  {
    n: '04',
    title: 'Software handover',
    body: 'Inference stack deployed, endpoints routed to your existing software, administrators trained. You hold the keys before we leave.',
    duration: '1 day',
    deliverable: 'Reconnected apps & trained admins',
  },
]

const unchanged = ['Same SDKs and JSON payloads', 'Same prompts and tooling', 'No API keys to rotate — ever']

const needs = [
  { title: 'Power', body: '230V/16A wall socket, or 380V 3-phase for Tier 3.' },
  { title: 'Space', body: 'A desk, 4U, or 8U of rack — tier dependent.' },
  { title: 'Network', body: 'One VLAN and a static IP on your LAN.' },
  { title: 'A person with keys', body: 'Someone to let us in on install day.' },
]

const after = [
  { title: 'Monitoring on your LAN', body: 'Utilization, temperature, and throughput — dashboards that never phone home.' },
  { title: 'Priority replacement parts', body: 'Multi-GPU tiers keep serving at reduced throughput while the spare ships.' },
  { title: 'An engineer you can call', body: 'The person who installed your node answers the phone. No ticket queues.' },
]

const showLocal = ref(true)
</script>

<template>
  <!-- Heading + timeline strip -->
  <section class="mx-auto max-w-6xl px-6 py-20">
    <SectionHeading
      label="03 — Process"
      title="Four steps to handover."
      lede="Weeks, not quarters. One team from audit to handover."
    />
    <div class="glass grid divide-y border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      <div v-for="item in timeline" :key="item.unit" class="p-8">
        <div class="text-4xl font-extrabold tracking-tight text-foreground">{{ item.stat }}</div>
        <div class="mt-1 text-sm text-muted-foreground">{{ item.unit }}</div>
      </div>
    </div>
  </section>

  <!-- Steps -->
  <section class="border-t">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <div class="relative">
        <div class="thread-x" aria-hidden="true" />
        <div
          v-for="(step, index) in steps"
          :key="step.n"
          v-reveal="index * 80"
          class="grid gap-6 border-b py-12 md:grid-cols-[110px_1fr_260px] md:gap-10"
        >
          <div class="text-6xl font-extrabold tracking-tight text-muted-foreground/30 md:text-7xl">
            {{ step.n }}
          </div>
          <div>
            <h3 class="text-2xl font-bold text-foreground">{{ step.title }}</h3>
            <p class="mt-3 max-w-xl leading-relaxed text-muted-foreground">{{ step.body }}</p>
          </div>
          <div class="space-y-5 md:border-l md:pl-8">
            <div>
              <span class="label-caps">Duration</span>
              <div class="mt-1 font-semibold text-foreground">{{ step.duration }}</div>
            </div>
            <div>
              <span class="label-caps">You get</span>
              <div class="mt-1 font-semibold text-foreground">{{ step.deliverable }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Zero refactoring -->
  <section class="border-t">
    <div class="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 lg:grid-cols-2">
      <div v-reveal>
        <span class="label-caps mb-4 block">Switching</span>
        <h2 class="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Zero refactoring.
        </h2>
        <p class="mt-4 max-w-md text-lg text-muted-foreground">
          Your software talks to your node exactly like it talked to the cloud — same REST API,
          different address.
        </p>
        <ul class="mt-8 space-y-3">
          <li
            v-for="item in unchanged"
            :key="item"
            class="flex items-center gap-3 text-[15px] text-foreground"
          >
            <Check class="h-5 w-5 shrink-0 text-foreground" />
            {{ item }}
          </li>
        </ul>
      </div>
      <div v-reveal="150">
        <div class="glass-strong flex border" role="tablist" aria-label="Before and after">
          <button
            type="button"
            role="tab"
            :aria-selected="!showLocal"
            class="flex-1 px-4 py-2.5 text-sm font-semibold transition-colors"
            :class="!showLocal ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'"
            @click="showLocal = false"
          >
            Before — cloud
          </button>
          <button
            type="button"
            role="tab"
            :aria-selected="showLocal"
            class="flex-1 border-l px-4 py-2.5 text-sm font-semibold transition-colors"
            :class="showLocal ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'"
            @click="showLocal = true"
          >
            After — your node
          </button>
        </div>
        <div class="glass overflow-x-auto border border-t-0 p-6">
          <pre v-if="showLocal" class="font-mono text-[13px] leading-relaxed"><code><span class="text-muted-foreground"># your node — same request, new address</span>
<span class="text-foreground">curl http://ai-node.internal:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model": "llama-3.3-70b", "messages": [...]}'</span>

<span class="text-muted-foreground"># → 200 OK · 11 ms first token · €0.00</span></code></pre>
          <pre v-else class="font-mono text-[13px] leading-relaxed"><code><span class="text-muted-foreground"># cloud provider</span>
<span class="text-foreground">curl https://api.cloud-provider.com/v1/chat/completions \
  -H "Authorization: Bearer $EXPENSIVE_API_KEY" \
  -d '{"model": "gpt-4o", "messages": [...]}'</span>

<span class="text-muted-foreground"># → 200 OK · 480 ms · metered per token</span></code></pre>
        </div>
      </div>
    </div>
  </section>

  <!-- What we need from you -->
  <section class="border-t">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <div v-reveal class="mb-12 max-w-2xl">
        <span class="label-caps mb-4 block">Your side of the list</span>
        <h2 class="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          All we need from you.
        </h2>
      </div>
      <div class="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(item, index) in needs"
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

  <!-- After handover -->
  <section class="border-t">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <div v-reveal class="mb-12 max-w-2xl">
        <span class="label-caps mb-4 block">After handover</span>
        <h2 class="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          We don't disappear.
        </h2>
      </div>
      <div class="glass grid divide-y border md:grid-cols-3 md:divide-x md:divide-y-0">
        <div v-for="(item, index) in after" :key="item.title" v-reveal="index * 100" class="p-8">
          <h3 class="font-bold text-foreground">{{ item.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ item.body }}</p>
        </div>
      </div>
    </div>
  </section>

  <NextStep to="/faq" index="04" title="Questions, answered" />
</template>
