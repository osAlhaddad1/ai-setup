<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

/** A glass Card whose hover spotlight follows the cursor. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

function onMove(event: PointerEvent) {
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  target.style.setProperty('--mx', `${event.clientX - rect.left}px`)
  target.style.setProperty('--my', `${event.clientY - rect.top}px`)
}
</script>

<template>
  <Card :class="cn('spotlight-card glass-subtle', props.class)" @pointermove="onMove">
    <slot />
  </Card>
</template>
