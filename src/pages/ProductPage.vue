<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import NextStep from '@/components/NextStep.vue'
import ServerRack3D from '@/components/ServerRack3D.vue'
import { productBySlug, quoteHref, specsFor } from '@/lib/products'
import { effectiveMonthly, formatEur } from '@/lib/tco'

const props = defineProps<{ slug: string }>()
const router = useRouter()

const product = computed(() => productBySlug(props.slug))

watchEffect(() => {
  if (!product.value) router.replace('/hardware')
})
</script>

<template>
  <template v-if="product">
    <!-- Hero -->
    <section class="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-2">
      <div v-reveal>
        <span class="label-caps">{{ product.tier.name }} — Hardware</span>
        <h1 class="mt-3 text-5xl font-extrabold tracking-tight text-foreground md:text-6xl">
          {{ product.tier.label }}
        </h1>
        <p class="mt-4 text-xl text-muted-foreground">{{ product.tagline }}</p>
        <p class="mt-2 max-w-md text-muted-foreground">{{ product.blurb }}</p>
        <div class="mt-8">
          <div class="text-4xl font-extrabold tracking-tight text-foreground">
            {{ formatEur(product.tier.capex) }}
          </div>
          <div class="mt-1 text-sm text-muted-foreground">
            ≈ {{ formatEur(effectiveMonthly(product.tier)) }}/mo over 36 months, power included
          </div>
        </div>
        <div class="mt-8 flex flex-wrap gap-4">
          <Button size="lg" as-child>
            <a :href="quoteHref(product.tier)">
              Request a quote
              <ArrowRight />
            </a>
          </Button>
          <Button size="lg" variant="outline" as-child>
            <RouterLink to="/pricing">See payback</RouterLink>
          </Button>
        </div>
      </div>
      <ServerRack3D v-reveal="150" />
    </section>

    <!-- Best for -->
    <section class="border-t">
      <div class="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
        <div v-for="(item, index) in product.bestFor" :key="item" v-reveal="index * 100">
          <span class="label-caps">Built for</span>
          <p class="mt-2 font-bold text-foreground">{{ item }}</p>
        </div>
      </div>
    </section>

    <!-- Specifications -->
    <section class="border-t">
      <div class="mx-auto max-w-6xl px-6 py-20">
        <h2 v-reveal class="mb-8 text-2xl font-bold text-foreground">Specifications</h2>
        <dl v-reveal class="glass max-w-3xl border px-6">
          <div
            v-for="spec in specsFor(product.tier.id)"
            :key="spec.label"
            class="grid grid-cols-2 gap-6 border-b py-4"
          >
            <dt class="text-sm text-muted-foreground">{{ spec.label }}</dt>
            <dd class="text-sm font-semibold text-foreground">{{ spec.value }}</dd>
          </div>
        </dl>
        <RouterLink
          to="/hardware"
          class="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Compare all tiers
          <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </RouterLink>
      </div>
    </section>

    <NextStep to="/pricing" index="02" title="Pricing & payback" />
  </template>
</template>
