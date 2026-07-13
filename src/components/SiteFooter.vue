<script setup lang="ts">
import { RouterLink } from 'vue-router'

const links = [
  { to: '/fleet', label: 'Hardware' },
  { to: '/calculator', label: 'Savings' },
  { to: '/deployment', label: 'Process' },
  { to: '/faq', label: 'FAQ' },
]
</script>

<template>
  <footer class="border-t">
    <div
      class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-12 text-sm text-muted-foreground"
    >
      <span class="text-xs font-extrabold tracking-[0.25em] text-foreground">IRONNODE</span>
      <nav class="flex gap-6" aria-label="Footer">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="transition-colors hover:text-foreground"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
      <span>© 2026</span>
    </div>
  </footer>
</template>
