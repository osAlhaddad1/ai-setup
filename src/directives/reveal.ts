import type { Directive } from 'vue'

/**
 * v-reveal — fades and slides an element in the first time it scrolls
 * into view. Respects prefers-reduced-motion. Optional stagger delay:
 * v-reveal="150" (milliseconds).
 *
 * Elements already inside the viewport at mount are shown immediately
 * (with their stagger delay) instead of waiting on IntersectionObserver,
 * so above-the-fold content never depends on observer timing.
 */
export const reveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const delay = binding.value ?? 0
    const show = () => {
      window.setTimeout(() => {
        el.classList.add('reveal-in')
        el.classList.remove('reveal-init')
      }, delay)
    }

    el.classList.add('reveal-init')

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      show()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          show()
          observer.unobserve(el)
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
  },
}
