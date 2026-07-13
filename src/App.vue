<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <div class="grid-texture fixed inset-0 -z-10" aria-hidden="true" />
  <SiteHeader />
  <main>
    <RouterView />
  </main>
  <SiteFooter />
</template>
