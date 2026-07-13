<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import InteractiveCard from '@/components/InteractiveCard.vue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import SectionHeading from '@/components/SectionHeading.vue'
import { TIERS } from '@/lib/tco'

const specs = [
  { label: 'Target Use Case', values: ['Inference (<50 concurrent users)', 'Heavy Inference & Fine-tuning', 'Continuous Pre-training & High Load'] },
  { label: 'GPU Configuration', values: ['2× NVIDIA RTX 4090', '4× NVIDIA L40S', '8× NVIDIA H200'] },
  { label: 'Total VRAM', values: ['48 GB GDDR6X', '192 GB GDDR6', '1,120 GB HBM3e'] },
  { label: 'System RAM', values: ['128 GB DDR5', '512 GB DDR5 ECC', '2,048 GB DDR5 ECC'] },
  { label: 'Storage', values: ['4 TB NVMe SSD', '16 TB NVMe Gen5 RAID', '64 TB NVMe Gen5 RAID'] },
  { label: 'Form Factor', values: ['Full-Tower Desktop', '4U Server Rack', '8U Server Rack'] },
  { label: 'Power Draw', values: ['1.2 kW', '2.8 kW', '10.2 kW'] },
  { label: 'Weight', values: ['24 kg', '42 kg', '130 kg'] },
  { label: 'Power Input', values: ['Standard 230V / 16A', 'Standard 230V / 16A', '380V 3-Phase'] },
]
</script>

<template>
  <section class="mx-auto max-w-6xl px-6 py-20">
    <SectionHeading
      kicker="The Fleet"
      title="Three Tiers. One Standard."
      lede="Every node is assembled, burned in for 72 hours at full load, and delivered ready for your rack."
    />

    <div class="mb-16 grid gap-6 md:grid-cols-3">
      <div v-for="(tier, index) in TIERS" :key="tier.id" v-reveal="index * 100">
        <InteractiveCard class="h-full transition-all hover:-translate-y-1 hover:border-primary/50">
          <CardHeader>
            <Badge variant="led" class="w-fit">{{ tier.name }}</Badge>
            <CardTitle class="pt-2 text-xl">{{ tier.label }}</CardTitle>
            <CardDescription>{{ tier.useCase }}</CardDescription>
          </CardHeader>
          <CardContent class="space-y-1 font-mono text-sm text-muted-foreground">
            <div>{{ specs[1].values[tier.id - 1] }}</div>
            <div>{{ specs[2].values[tier.id - 1] }} VRAM</div>
            <div>{{ specs[6].values[tier.id - 1] }} draw</div>
          </CardContent>
        </InteractiveCard>
      </div>
    </div>

    <h2 class="mb-6 text-2xl font-bold text-foreground">Full Specifications</h2>
    <Card v-reveal class="glass-subtle overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow class="bg-background/50 hover:bg-background/50">
            <TableHead>Spec / Tier</TableHead>
            <TableHead v-for="tier in TIERS" :key="tier.id">
              <span class="block font-mono text-[10px] font-medium uppercase tracking-widest text-led">
                {{ tier.name }}
              </span>
              {{ tier.label }}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="spec in specs" :key="spec.label">
            <TableCell class="whitespace-nowrap font-sans font-semibold text-muted-foreground">
              {{ spec.label }}
            </TableCell>
            <TableCell v-for="(value, i) in spec.values" :key="i" class="text-foreground">
              {{ value }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>

    <div class="mt-16 text-center">
      <p class="mb-6 text-muted-foreground">Not sure which tier fits? The calculator recommends one.</p>
      <Button size="lg" as-child>
        <RouterLink to="/calculator">
          Find My Tier
          <ArrowRight />
        </RouterLink>
      </Button>
    </div>
  </section>
</template>
