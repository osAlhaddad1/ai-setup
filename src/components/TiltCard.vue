<script setup lang="ts">
import { onMounted, ref } from 'vue'

/** Wraps content in a cursor-tracking 3D tilt with a moving glare sheen. */
const MAX_TILT_DEG = 7

const el = ref<HTMLElement>()
const active = ref(false)
let reducedMotion = false

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

function onMove(event: PointerEvent) {
  if (reducedMotion || !el.value || event.pointerType !== 'mouse') return
  const rect = el.value.getBoundingClientRect()
  const px = (event.clientX - rect.left) / rect.width
  const py = (event.clientY - rect.top) / rect.height

  const rotateY = (px - 0.5) * 2 * MAX_TILT_DEG
  const rotateX = (0.5 - py) * 2 * MAX_TILT_DEG

  active.value = true
  el.value.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`
  el.value.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`)
  el.value.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`)
}

function onLeave() {
  if (!el.value) return
  active.value = false
  el.value.style.transform = ''
}
</script>

<template>
  <div
    ref="el"
    class="relative transition-transform duration-300 ease-out will-change-transform"
    :class="{ 'tilt-active': active }"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <slot />
    <div class="tilt-glare rounded-xl" />
  </div>
</template>
