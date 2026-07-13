<script setup lang="ts">
import MeshBackground from '@/components/MeshBackground.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <MeshBackground />
  <SiteHeader />
  <main>
    <RouterView />
  </main>
  <SiteFooter />
</template>
