<script setup lang="ts">
import { RouterLink } from 'vue-router'

const columns = [
  {
    label: 'Hardware',
    links: [
      { to: '/hardware/workstation', label: 'Workstation' },
      { to: '/hardware/rack-unit', label: 'Rack Unit' },
      { to: '/hardware/enterprise-node', label: 'Enterprise Node' },
      { to: '/hardware', label: 'Compare all' },
      { to: '/pricing', label: 'Pricing' },
    ],
  },
  {
    label: 'Resources',
    links: [
      { to: '/deployment', label: 'Deployment' },
      { to: '/faq', label: 'FAQ' },
    ],
  },
  {
    label: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/careers', label: 'Careers' },
      { to: '/contact', label: 'Contact' },
    ],
  },
]
</script>

<template>
  <footer class="overflow-hidden border-t">
    <div class="mx-auto max-w-6xl px-6 pb-10 pt-16">
      <div class="grid gap-12 md:grid-cols-4">
        <div>
          <span class="text-sm font-extrabold tracking-[0.25em] text-foreground">IRONNODE</span>
          <p class="mt-3 max-w-xs text-sm text-muted-foreground">
            Enterprise AI infrastructure, entirely on-premise.
          </p>
        </div>
        <nav v-for="column in columns" :key="column.label" :aria-label="column.label">
          <span class="label-caps">{{ column.label }}</span>
          <ul class="mt-4 space-y-2.5">
            <li v-for="link in column.links" :key="link.to">
              <RouterLink
                :to="link.to"
                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>

      <div
        class="mt-16 select-none text-center text-[17vw] font-extrabold leading-[0.8] tracking-tight text-foreground/[0.06] lg:text-[11.5rem]"
        aria-hidden="true"
      >
        IRONNODE
      </div>

      <div class="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-xs text-muted-foreground">
        <span>© 2026 IRONNODE B.V. — Rotterdam, The Netherlands</span>
        <span>All systems local.</span>
      </div>
    </div>
  </footer>
</template>
