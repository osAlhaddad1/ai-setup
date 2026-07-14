<script setup lang="ts">
import { RouterLink } from 'vue-router'

const product = [
  { to: '/fleet', label: 'Hardware' },
  { to: '/calculator', label: 'Pricing' },
  { to: '/deployment', label: 'Process' },
  { to: '/faq', label: 'FAQ' },
]

const contact = [
  { href: 'mailto:sales@ironnode.example?subject=Talk%20to%20an%20engineer', label: 'Talk to an engineer' },
  { href: 'mailto:sales@ironnode.example?subject=Quote%20request', label: 'Request a quote' },
]
</script>

<template>
  <footer class="overflow-hidden border-t">
    <div class="mx-auto max-w-6xl px-6 pb-10 pt-16">
      <div class="grid gap-12 md:grid-cols-3">
        <div>
          <span class="text-sm font-extrabold tracking-[0.25em] text-foreground">IRONNODE</span>
          <p class="mt-3 max-w-xs text-sm text-muted-foreground">
            Enterprise AI infrastructure, entirely on-premise.
          </p>
        </div>
        <nav aria-label="Product">
          <span class="label-caps">Product</span>
          <ul class="mt-4 space-y-2.5">
            <li v-for="link in product" :key="link.to">
              <RouterLink
                :to="link.to"
                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>
        <nav aria-label="Contact">
          <span class="label-caps">Contact</span>
          <ul class="mt-4 space-y-2.5">
            <li v-for="link in contact" :key="link.label">
              <a
                :href="link.href"
                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {{ link.label }}
              </a>
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
        <span>© 2026 IRONNODE</span>
        <span>All systems local.</span>
      </div>
    </div>
  </footer>
</template>
