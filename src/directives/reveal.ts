import type { Directive } from 'vue'

const CLEANUP = Symbol('reveal-cleanup')

interface RevealElement extends HTMLElement {
  [CLEANUP]?: () => void
}

/**
 * v-reveal — fades and slides an element in the first time it scrolls
 * into view. Respects prefers-reduced-motion. Optional stagger delay:
 * v-reveal="150" (milliseconds).
 *
 * Reveal triggers, in order of preference:
 *  1. already in the viewport at mount — shown immediately
 *  2. IntersectionObserver
 *  3. a passive scroll listener as a fallback, so content can never
 *     stay hidden in environments where the observer misbehaves
 */
export const reveal: Directive<RevealElement, number | undefined> = {
  mounted(el, binding) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const delay = binding.value ?? 0
    let done = false
    let observer: IntersectionObserver | undefined

    const inView = () => {
      const rect = el.getBoundingClientRect()
      return rect.top < window.innerHeight && rect.bottom > 0
    }

    const cleanup = () => {
      observer?.disconnect()
      window.removeEventListener('scroll', onScroll)
    }

    const show = () => {
      if (done) return
      done = true
      window.setTimeout(() => {
        el.classList.add('reveal-in')
        el.classList.remove('reveal-init')
      }, delay)
      cleanup()
    }

    function onScroll() {
      if (inView()) show()
    }

    el[CLEANUP] = cleanup
    el.classList.add('reveal-init')

    if (inView()) {
      show()
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) show()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
  },
  unmounted(el) {
    el[CLEANUP]?.()
  },
}
