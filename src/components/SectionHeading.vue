<script setup lang="ts">
defineProps<{
  label?: string
  title: string
  lede?: string
}>()
</script>

<template>
  <div class="mb-14 max-w-2xl">
    <span v-if="label" class="label-caps mb-4 block">{{ label }}</span>
    <h2 class="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">{{ title }}</h2>
    <p v-if="lede" class="mt-4 text-lg text-muted-foreground">{{ lede }}</p>
  </div>
</template>
