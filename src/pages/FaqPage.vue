<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import SectionHeading from '@/components/SectionHeading.vue'

const faqs = [
  {
    q: 'How do we update models when new architectures are released?',
    a: 'We utilize standard containerized environments (Docker/Kubernetes). Updating a model requires pulling the new weights into the persistent storage volume and restarting the inference container. No hardware changes are required unless VRAM requirements exceed current capacity.',
  },
  {
    q: 'Can we integrate this with our existing internal databases for RAG?',
    a: 'Yes. The software stack includes vector database integration (e.g., Qdrant, Milvus, or pgvector running locally) and embedding models to execute Retrieval-Augmented Generation entirely within your local network.',
  },
  {
    q: 'What happens if a GPU fails?',
    a: 'Multi-GPU enterprise tiers utilize redundant configurations. If a single GPU fails, the inference engine dynamically reroutes processing to the remaining GPUs at a reduced throughput until hardware replacement occurs.',
  },
  {
    q: 'What are the cooling requirements?',
    a: 'Server rooms must support HVAC heat dissipation equal to the total power draw of the selected tier (e.g., Tier 2 requires dissipation of 2.8 kW of continuous heat output).',
  },
]
</script>

<template>
  <section class="mx-auto max-w-6xl px-6 py-20">
    <SectionHeading label="04 — FAQ" title="What your IT team will ask." />
    <Accordion type="single" collapsible class="glass max-w-3xl border px-6">
      <AccordionItem v-for="faq in faqs" :key="faq.q" :value="faq.q">
        <AccordionTrigger class="py-6 text-base">{{ faq.q }}</AccordionTrigger>
        <AccordionContent class="text-[15px] leading-relaxed">{{ faq.a }}</AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>

  <section class="border-t">
    <div class="mx-auto max-w-6xl px-6 py-28 text-center">
      <h2 v-reveal class="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
        Own your inference.
      </h2>
      <p v-reveal="100" class="mx-auto mt-5 max-w-md text-lg text-muted-foreground">
        A site audit sizes the exact node your workload needs.
      </p>
      <Button v-reveal="200" size="lg" class="mt-10" as-child>
        <a href="mailto:sales@ironnode.example?subject=Talk%20to%20an%20engineer">Talk to an engineer</a>
      </Button>
    </div>
  </section>
</template>
