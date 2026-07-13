<script setup lang="ts">
defineProps<{
  kicker: string
  title: string
  lede?: string
}>()
</script>

<template>
  <div class="mb-14 max-w-2xl">
    <span class="mb-3 block font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
      // {{ kicker }}
    </span>
    <h2 class="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{{ title }}</h2>
    <p v-if="lede" class="mt-4 text-lg leading-relaxed text-muted-foreground">{{ lede }}</p>
  </div>
</template>
