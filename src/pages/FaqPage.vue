<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
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
    <SectionHeading
      kicker="Technical FAQ"
      title="Your IT Team Will Ask. We Answered."
    />
    <Accordion type="single" collapsible class="max-w-3xl">
      <AccordionItem v-for="faq in faqs" :key="faq.q" :value="faq.q">
        <AccordionTrigger class="text-base">{{ faq.q }}</AccordionTrigger>
        <AccordionContent class="text-[15px]">{{ faq.a }}</AccordionContent>
      </AccordionItem>
    </Accordion>

    <div v-reveal class="glass mt-20 rounded-xl border p-10 text-center">
      <h2 class="text-2xl font-bold text-foreground md:text-3xl">Still have questions?</h2>
      <p class="mx-auto mt-3 max-w-lg text-muted-foreground">
        Book a site audit. We analyze your token volume, concurrency, and server room — and size
        the exact node your workload needs.
      </p>
      <Button size="lg" class="mt-7" as-child>
        <a href="mailto:audit@ironnode.example?subject=Site%20Audit%20Request">
          Book a Site Audit
          <ArrowRight />
        </a>
      </Button>
    </div>
  </section>
</template>
