<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

/** End-of-page band pointing to the next stop in the site journey. */
defineProps<{
  to: string
  index: string
  title: string
}>()
</script>

<template>
  <RouterLink
    :to="to"
    class="group mt-24 flex items-center justify-between border-t py-10 transition-colors hover:bg-card"
  >
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-6">
      <div>
        <span class="label-caps">Next — {{ index }}</span>
        <div class="mt-1 text-2xl font-bold text-foreground md:text-4xl">{{ title }}</div>
      </div>
      <ArrowRight
        class="h-8 w-8 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-2 group-hover:text-foreground"
      />
    </div>
  </RouterLink>
</template>
