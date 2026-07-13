<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import BrandMark from '@/components/BrandMark.vue'

const links = [
  { to: '/fleet', label: 'The Fleet' },
  { to: '/calculator', label: 'Savings Calculator' },
  { to: '/deployment', label: 'Deployment' },
  { to: '/faq', label: 'FAQ' },
]

const mobileOpen = ref(false)
</script>

<template>
  <header class="glass-subtle sticky top-0 z-50 border-b">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <RouterLink to="/" class="flex items-center gap-2.5" @click="mobileOpen = false">
        <BrandMark />
        <span class="font-mono text-base font-bold tracking-wider text-foreground">IRONNODE</span>
      </RouterLink>

      <nav class="hidden items-center gap-7 md:flex" aria-label="Main">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          active-class="text-primary hover:text-primary"
        >
          {{ link.label }}
        </RouterLink>
        <Button as-child>
          <a href="mailto:audit@ironnode.example?subject=Site%20Audit%20Request">Book a Site Audit</a>
        </Button>
      </nav>

      <Button
        variant="ghost"
        size="icon"
        class="md:hidden"
        :aria-expanded="mobileOpen"
        aria-label="Toggle menu"
        @click="mobileOpen = !mobileOpen"
      >
        <X v-if="mobileOpen" />
        <Menu v-else />
      </Button>
    </div>

    <nav
      v-if="mobileOpen"
      class="border-t bg-card px-6 pb-6 pt-3 md:hidden"
      aria-label="Mobile"
    >
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="block py-2.5 text-sm font-medium text-muted-foreground"
        active-class="text-primary"
        @click="mobileOpen = false"
      >
        {{ link.label }}
      </RouterLink>
      <Button as-child class="mt-3 w-full">
        <a href="mailto:audit@ironnode.example?subject=Site%20Audit%20Request">Book a Site Audit</a>
      </Button>
    </nav>
  </header>
</template>
