<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import SectionHeading from '@/components/SectionHeading.vue'

const steps = [
  {
    title: 'Site Audit & Sizing',
    body: 'Analyze current API token volume, concurrency requirements, and physical server room capabilities — power, cooling, rack space.',
  },
  {
    title: 'Assembly & Stress Testing',
    body: 'Hardware integration and a 72-hour continuous full-load burn-in test to identify thermal or component failures before shipping.',
  },
  {
    title: 'On-Site Installation',
    body: 'Physical rack mounting, network configuration, and bare-metal OS installation within your air-gapped or internal network.',
  },
  {
    title: 'Software Handover',
    body: 'Deployment of the inference software stack, endpoint routing to your existing software, and administrator training.',
  },
]

const stack = ['vLLM', 'Docker', 'Kubernetes', 'Qdrant', 'Milvus', 'pgvector', 'OpenAI-compatible API']
</script>

<template>
  <section class="mx-auto max-w-6xl px-6 py-20">
    <SectionHeading
      kicker="Deployment Pipeline"
      title="From Site Audit to Handover."
      lede="A fixed four-step process takes you from your current cloud bill to a running local node."
    />

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="(step, index) in steps"
        :key="step.title"
        class="relative border-t-2 border-border pt-6 lg:[&:not(:last-child)]:after:absolute lg:[&:not(:last-child)]:after:-top-[5px] lg:[&:not(:last-child)]:after:left-0 lg:[&:not(:last-child)]:after:h-2 lg:[&:not(:last-child)]:after:w-2 lg:[&:not(:last-child)]:after:rounded-full"
      >
        <span
          class="absolute -top-[5px] left-0 h-2 w-2 rounded-full bg-primary shadow-[0_0_12px] shadow-primary/80"
          aria-hidden="true"
        />
        <span class="block font-mono text-xs tracking-[0.15em] text-primary">
          STEP 0{{ index + 1 }}
        </span>
        <h3 class="mt-2 font-semibold text-foreground">{{ step.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ step.body }}</p>
      </div>
    </div>
  </section>

  <section class="border-y bg-card/50">
    <div class="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 lg:grid-cols-[5fr_7fr]">
      <div>
        <SectionHeading
          class="mb-0"
          kicker="Software Stack"
          title="Production-Ready Open-Source Stack."
          lede="We configure bare-metal servers with containerized inference engines. Your internal applications connect via standard REST APIs, requiring zero code refactoring to switch from cloud providers to your local node."
        />
        <div class="mt-7 flex flex-wrap gap-2">
          <Badge v-for="item in stack" :key="item" variant="outline">{{ item }}</Badge>
        </div>
      </div>
      <Card class="overflow-hidden shadow-2xl shadow-black/40">
        <CardContent class="overflow-x-auto p-6">
          <pre class="font-mono text-[13px] leading-relaxed"><code><span class="text-muted-foreground"># Before: cloud provider</span>
<span class="text-foreground">curl</span> <span class="text-led">https://api.cloud-provider.com/v1/chat/completions</span> \
  -H <span class="text-led">"Authorization: Bearer $EXPENSIVE_API_KEY"</span>

<span class="text-muted-foreground"># After: your node — same request, zero refactoring</span>
<span class="text-foreground">curl</span> <span class="text-led">http://ai-node.internal:8000/v1/chat/completions</span> \
  -H <span class="text-led">"Content-Type: application/json"</span> \
  -d <span class="text-led">'{
    "model": "llama-3.3-70b-instruct",
    "messages": [{"role": "user", "content": "..."}]
  }'</span>

<span class="text-muted-foreground"># → 200 OK · 11ms first token · €0.00</span></code></pre>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
