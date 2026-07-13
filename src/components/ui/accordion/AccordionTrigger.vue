<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { AccordionHeader, AccordionTrigger, type AccordionTriggerProps } from 'reka-ui'
import { ChevronDown } from 'lucide-vue-next'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      v-bind="delegatedProps"
      :class="
        cn(
          'flex flex-1 items-center justify-between py-4 text-left text-sm font-semibold transition-all hover:text-primary [&[data-state=open]>svg]:rotate-180',
          props.class,
        )
      "
    >
      <slot />
      <ChevronDown
        class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
      />
    </AccordionTrigger>
  </AccordionHeader>
</template>
