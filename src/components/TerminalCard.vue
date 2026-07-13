<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import StatusDot from '@/components/StatusDot.vue'

const latency = ref(11)
const throughput = ref(142)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    latency.value = 9 + Math.floor(Math.random() * 5)
    throughput.value = 136 + Math.floor(Math.random() * 14)
  }, 1800)
})
onUnmounted(() => clearInterval(timer))

const rows = [
  { k: 'MODEL', v: 'llama-3.3-70b-instruct', led: false },
  { k: 'EXTERNAL CALLS', v: '0 — air-gapped', led: true },
  { k: 'API COST THIS MONTH', v: '€0.00', led: true },
]
</script>

<template>
  <div
    class="overflow-hidden rounded-xl border bg-card font-mono text-[13px] shadow-2xl shadow-black/40"
  >
    <div class="flex items-center gap-2 border-b px-4 py-3">
      <span class="h-2.5 w-2.5 rounded-full bg-secondary" />
      <span class="h-2.5 w-2.5 rounded-full bg-secondary" />
      <span class="h-2.5 w-2.5 rounded-full bg-secondary" />
      <span class="ml-2 text-xs text-muted-foreground">node-01 · local inference monitor</span>
    </div>
    <div class="p-5">
      <div class="flex items-center justify-between border-b border-dashed border-border/60 py-2">
        <span class="text-muted-foreground">STATUS</span>
        <span class="inline-flex items-center gap-2 font-bold text-led">
          <StatusDot />
          SYSTEM ONLINE
        </span>
      </div>
      <div class="flex items-center justify-between border-b border-dashed border-border/60 py-2">
        <span class="text-muted-foreground">FIRST-TOKEN LATENCY</span>
        <span class="font-medium text-led">{{ latency }} ms</span>
      </div>
      <div class="flex items-center justify-between border-b border-dashed border-border/60 py-2">
        <span class="text-muted-foreground">THROUGHPUT</span>
        <span class="font-medium text-led">{{ throughput }} tok/s</span>
      </div>
      <div
        v-for="row in rows"
        :key="row.k"
        class="flex items-center justify-between border-b border-dashed border-border/60 py-2"
      >
        <span class="text-muted-foreground">{{ row.k }}</span>
        <span class="font-medium" :class="row.led ? 'text-led' : 'text-foreground'">{{ row.v }}</span>
      </div>
      <div class="pt-2 text-muted-foreground">
        uptime 214d 07:32:11 <span class="animate-pulse text-led">▌</span>
      </div>
    </div>
  </div>
</template>
