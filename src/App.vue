<script setup lang="ts">
import GlassBackdrop from '@/components/GlassBackdrop.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <GlassBackdrop />
  <SiteHeader />
  <main>
    <RouterView />
  </main>
  <SiteFooter />
</template>
