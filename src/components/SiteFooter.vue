<script setup lang="ts">
import StatusDot from '@/components/StatusDot.vue'
</script>

<template>
  <footer class="border-t">
    <div
      class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground"
    >
      <span>© 2026 IRONNODE. Enterprise AI infrastructure, entirely on-premise.</span>
      <span class="inline-flex items-center gap-2 font-mono text-xs text-led">
        <StatusDot />
        ALL SYSTEMS LOCAL
      </span>
    </div>
  </footer>
</template>
