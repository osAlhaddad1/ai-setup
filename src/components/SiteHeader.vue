<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ChevronDown, Menu, X } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

interface MenuItem {
  to: string
  title: string
  desc: string
}
interface Menu {
  label: string
  items: MenuItem[]
}

const menus: Menu[] = [
  {
    label: 'Hardware',
    items: [
      { to: '/hardware/workstation', title: 'Workstation', desc: '2× RTX 4090 · under a desk' },
      { to: '/hardware/rack-unit', title: 'Rack Unit', desc: '4× L40S · most deployed' },
      { to: '/hardware/enterprise-node', title: 'Enterprise Node', desc: '8× H200 · training class' },
      { to: '/hardware', title: 'Compare all', desc: 'Full specifications, side by side' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { to: '/deployment', title: 'Deployment', desc: 'Four steps to handover' },
      { to: '/faq', title: 'FAQ', desc: 'What your IT team will ask' },
    ],
  },
  {
    label: 'Company',
    items: [
      { to: '/about', title: 'About', desc: 'Why we build on-premise' },
      { to: '/careers', title: 'Careers', desc: 'Open roles' },
      { to: '/contact', title: 'Contact', desc: 'Talk to a human' },
    ],
  },
]

const openMenu = ref<string | null>(null)
const mobileOpen = ref(false)

const route = useRoute()
watch(
  () => route.fullPath,
  () => {
    openMenu.value = null
    mobileOpen.value = false
  },
)

function toggleMenu(label: string) {
  openMenu.value = openMenu.value === label ? null : label
}
</script>

<template>
  <header class="glass-strong sticky top-0 z-50 border-b">
    <div class="mx-auto flex h-16 max-w-6xl items-center gap-10 px-6">
      <RouterLink
        to="/"
        class="text-sm font-extrabold tracking-[0.25em] text-foreground"
        @click="mobileOpen = false"
      >
        IRONNODE
      </RouterLink>

      <!-- Desktop nav -->
      <nav class="hidden flex-1 items-center gap-1 lg:flex" aria-label="Main">
        <div
          v-for="menu in menus"
          :key="menu.label"
          class="relative"
          @pointerenter="openMenu = menu.label"
          @pointerleave="openMenu = null"
        >
          <button
            type="button"
            class="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors"
            :class="openMenu === menu.label ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'"
            :aria-expanded="openMenu === menu.label"
            @click="toggleMenu(menu.label)"
          >
            {{ menu.label }}
            <ChevronDown
              class="h-3.5 w-3.5 transition-transform"
              :class="{ 'rotate-180': openMenu === menu.label }"
            />
          </button>
          <div
            v-if="openMenu === menu.label"
            class="glass-strong panel-shadow absolute left-0 top-full w-72 border p-2"
          >
            <RouterLink
              v-for="item in menu.items"
              :key="item.to"
              :to="item.to"
              class="block rounded-md px-3 py-2.5 transition-colors hover:bg-white/70"
            >
              <div class="text-sm font-semibold text-foreground">{{ item.title }}</div>
              <div class="mt-0.5 text-xs text-muted-foreground">{{ item.desc }}</div>
            </RouterLink>
          </div>
        </div>
        <RouterLink
          to="/pricing"
          class="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          active-class="text-foreground"
        >
          Pricing
        </RouterLink>
      </nav>

      <!-- Desktop CTAs -->
      <div class="hidden items-center gap-3 lg:flex">
        <Button variant="outline" as-child>
          <a href="mailto:sales@ironnode.example?subject=Talk%20to%20an%20engineer">Talk to an engineer</a>
        </Button>
        <Button as-child>
          <a href="mailto:sales@ironnode.example?subject=Quote%20request">Get a quote</a>
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        class="ml-auto lg:hidden"
        :aria-expanded="mobileOpen"
        aria-label="Toggle menu"
        @click="mobileOpen = !mobileOpen"
      >
        <X v-if="mobileOpen" />
        <Menu v-else />
      </Button>
    </div>

    <!-- Mobile nav -->
    <nav
      v-if="mobileOpen"
      class="max-h-[calc(100vh-4rem)] overflow-y-auto border-t bg-background px-6 pb-8 pt-4 lg:hidden"
      aria-label="Mobile"
    >
      <div v-for="menu in menus" :key="menu.label" class="border-b py-4">
        <span class="label-caps">{{ menu.label }}</span>
        <RouterLink
          v-for="item in menu.items"
          :key="item.to"
          :to="item.to"
          class="mt-3 block text-base font-medium text-foreground"
        >
          {{ item.title }}
        </RouterLink>
      </div>
      <RouterLink to="/pricing" class="block border-b py-4 text-base font-medium text-foreground">
        Pricing
      </RouterLink>
      <div class="mt-6 grid gap-3">
        <Button variant="outline" as-child>
          <a href="mailto:sales@ironnode.example?subject=Talk%20to%20an%20engineer">Talk to an engineer</a>
        </Button>
        <Button as-child>
          <a href="mailto:sales@ironnode.example?subject=Quote%20request">Get a quote</a>
        </Button>
      </div>
    </nav>
  </header>
</template>
