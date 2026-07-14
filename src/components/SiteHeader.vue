<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const links = [
  { n: '01', to: '/fleet', label: 'Hardware' },
  { n: '02', to: '/calculator', label: 'Pricing' },
  { n: '03', to: '/deployment', label: 'Process' },
  { n: '04', to: '/faq', label: 'FAQ' },
]

const mobileOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-sm">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <RouterLink
        to="/"
        class="text-sm font-extrabold tracking-[0.25em] text-foreground"
        @click="mobileOpen = false"
      >
        IRONNODE
      </RouterLink>

      <nav class="hidden items-center gap-8 md:flex" aria-label="Main">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="group text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          active-class="text-foreground"
        >
          <span class="mr-1.5 text-xs opacity-60">{{ link.n }}</span>{{ link.label }}
        </RouterLink>
        <Button as-child>
          <a href="mailto:sales@ironnode.example?subject=Talk%20to%20an%20engineer">Talk to an engineer</a>
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

    <nav v-if="mobileOpen" class="border-t bg-background px-6 pb-6 pt-3 md:hidden" aria-label="Mobile">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="block py-3 text-base font-medium text-muted-foreground"
        active-class="text-foreground"
        @click="mobileOpen = false"
      >
        <span class="mr-2 text-sm opacity-60">{{ link.n }}</span>{{ link.label }}
      </RouterLink>
      <Button as-child class="mt-4 w-full">
        <a href="mailto:sales@ironnode.example?subject=Talk%20to%20an%20engineer">Talk to an engineer</a>
      </Button>
    </nav>
  </header>
</template>
