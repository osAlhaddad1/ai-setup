<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

/** End-of-page CTA band pointing to the next stop in the site journey. */
defineProps<{
  to: string
  index: string
  title: string
}>()
</script>

<template>
  <RouterLink
    :to="to"
    class="group block bg-primary text-primary-foreground transition-opacity hover:opacity-90"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-14">
      <div>
        <span class="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
          Next — {{ index }}
        </span>
        <div class="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">{{ title }}</div>
      </div>
      <ArrowRight class="h-10 w-10 shrink-0 transition-transform group-hover:translate-x-2" />
    </div>
  </RouterLink>
</template>
