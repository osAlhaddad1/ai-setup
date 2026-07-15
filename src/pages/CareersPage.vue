<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import NextStep from '@/components/NextStep.vue'
import SectionHeading from '@/components/SectionHeading.vue'

const roles = [
  { title: 'Field Deployment Engineer', team: 'Deployment', location: 'On-site, EU-wide', type: 'Full-time' },
  { title: 'Inference Systems Engineer', team: 'Software', location: 'Rotterdam / hybrid', type: 'Full-time' },
  { title: 'Solutions Architect', team: 'Sales Engineering', location: 'Remote, EU', type: 'Full-time' },
  { title: 'Hardware Test Technician', team: 'Assembly', location: 'Rotterdam', type: 'Full-time' },
]

function applyHref(role: string): string {
  return `mailto:careers@ironnode.example?subject=${encodeURIComponent(`Application — ${role}`)}`
}
</script>

<template>
  <section class="mx-auto max-w-6xl px-6 py-20">
    <SectionHeading
      label="Careers"
      title="Help companies own their AI."
      lede="Small team. Real machines. Customers you can name."
    />

    <div class="border-t">
      <a
        v-for="(role, index) in roles"
        :key="role.title"
        v-reveal="index * 80"
        :href="applyHref(role.title)"
        class="group grid items-center gap-2 border-b py-6 transition-colors hover:bg-card sm:grid-cols-[2fr_1fr_1fr_auto]"
      >
        <span class="font-bold text-foreground">{{ role.title }}</span>
        <span class="text-sm text-muted-foreground">{{ role.team }}</span>
        <span class="text-sm text-muted-foreground">{{ role.location }} · {{ role.type }}</span>
        <ArrowRight
          class="hidden h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 sm:block"
        />
      </a>
    </div>

    <p class="mt-8 text-sm text-muted-foreground">
      Nothing that fits?
      <a
        href="mailto:careers@ironnode.example?subject=Open%20application"
        class="font-medium text-foreground underline-offset-4 hover:underline"
      >
        Pitch us anyway.
      </a>
    </p>
  </section>

  <NextStep to="/about" index="Company" title="Why we build on-premise" />
</template>
