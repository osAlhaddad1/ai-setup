<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import NextStep from '@/components/NextStep.vue'
import NodeThumb from '@/components/NodeThumb.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { PRODUCTS, quoteHref, SPEC_ROWS, THUMB_UNITS } from '@/lib/products'
import { formatEur } from '@/lib/tco'
</script>

<template>
  <section class="mx-auto max-w-6xl px-6 py-20">
    <SectionHeading
      label="01 — Hardware"
      title="Three sizes. One standard."
      lede="Assembled, burned in for 72 hours at full load, delivered ready to run."
    />

    <div class="grid divide-y border md:grid-cols-3 md:divide-x md:divide-y-0">
      <div
        v-for="(product, index) in PRODUCTS"
        :key="product.slug"
        v-reveal="index * 100"
        class="flex flex-col p-8"
      >
        <div class="flex items-start justify-between gap-4">
          <span class="label-caps">{{ product.tier.name }}</span>
          <NodeThumb :units="THUMB_UNITS[product.tier.id]" />
        </div>
        <h3 class="mt-3 text-2xl font-bold text-foreground">{{ product.tier.label }}</h3>
        <p class="mt-1 text-sm text-muted-foreground">{{ product.tagline }}</p>
        <div class="mt-6 text-sm text-muted-foreground">
          from <span class="font-semibold text-foreground">{{ formatEur(product.tier.capex) }}</span>
        </div>
        <div class="mt-6 flex flex-col gap-3">
          <Button :variant="product.tier.id === 2 ? 'default' : 'outline'" as-child>
            <a :href="quoteHref(product.tier)">Request a quote</a>
          </Button>
          <RouterLink
            :to="`/hardware/${product.slug}`"
            class="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View details
            <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </RouterLink>
        </div>
      </div>
    </div>

    <h2 class="mb-6 mt-20 text-2xl font-bold text-foreground">Full specifications</h2>
    <div v-reveal class="border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-44" />
            <TableHead v-for="product in PRODUCTS" :key="product.slug">
              <span class="label-caps block">{{ product.tier.name }}</span>
              {{ product.tier.label }}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="spec in SPEC_ROWS" :key="spec.label">
            <TableCell class="whitespace-nowrap text-muted-foreground">{{ spec.label }}</TableCell>
            <TableCell v-for="(value, i) in spec.values" :key="i" class="text-foreground">
              {{ value }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </section>

  <NextStep to="/pricing" index="02" title="Pricing & payback" />
</template>
