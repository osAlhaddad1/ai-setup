<script setup lang="ts">
import { onMounted, ref } from 'vue'

/**
 * A CSS-3D server node — the product itself as the hero visual.
 * Idles with a slow bob; follows the cursor with a gentle rotation.
 */
const BASE_X = -8
const BASE_Y = -26

const rack = ref<HTMLElement>()
let reducedMotion = false

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

function onMove(event: PointerEvent) {
  if (reducedMotion || !rack.value || event.pointerType !== 'mouse') return
  const scene = event.currentTarget as HTMLElement
  const rect = scene.getBoundingClientRect()
  const px = (event.clientX - rect.left) / rect.width
  const py = (event.clientY - rect.top) / rect.height
  const ry = BASE_Y + (px - 0.5) * 36
  const rx = BASE_X + (0.5 - py) * 16
  rack.value.style.transform = `rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg)`
}

function onLeave() {
  if (!rack.value) return
  rack.value.style.transform = ''
}

const units = [
  { leds: 2, wide: false },
  { leds: 1, wide: true },
  { leds: 2, wide: false },
  { leds: 1, wide: false },
  { leds: 2, wide: true },
  { leds: 1, wide: false },
]
</script>

<template>
  <div
    class="scene mx-auto"
    aria-label="3D model of an IRONNODE server"
    role="img"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <div class="bob">
      <div ref="rack" class="rack">
        <!-- front -->
        <div class="face front">
          <div v-for="(unit, i) in units" :key="i" class="unit">
            <div class="leds">
              <span class="led on" />
              <span v-if="unit.leds > 1" class="led dim" />
            </div>
            <span v-if="i === 0" class="unit-brand">IRONNODE</span>
            <div class="vents" :class="{ wide: unit.wide }" />
          </div>
        </div>
        <!-- back / sides / top -->
        <div class="face back" />
        <div class="face left" />
        <div class="face right" />
        <div class="face top" />
      </div>
      <div class="shadow" />
    </div>
  </div>
</template>

<style scoped>
.scene {
  width: 320px;
  max-width: 100%;
  height: 440px;
  perspective: 1100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bob {
  animation: bob 7s ease-in-out infinite;
}
.rack {
  position: relative;
  width: 220px;
  height: 340px;
  transform-style: preserve-3d;
  transform: rotateX(-8deg) rotateY(-26deg);
  transition: transform 0.35s ease-out;
}
.face {
  position: absolute;
  border: 1px solid oklch(0.95 0.012 85 / 0.22);
  background: oklch(0.23 0.042 258);
}
.front {
  inset: 0;
  transform: translateZ(70px);
  display: flex;
  flex-direction: column;
  background: linear-gradient(160deg, oklch(0.26 0.042 258), oklch(0.21 0.042 258));
}
.back {
  inset: 0;
  transform: rotateY(180deg) translateZ(70px);
  background: oklch(0.2 0.042 258);
}
.left,
.right {
  top: 0;
  bottom: 0;
  width: 140px;
  left: 50%;
  margin-left: -70px;
  background:
    repeating-linear-gradient(
      90deg,
      transparent 0 18px,
      oklch(0.95 0.012 85 / 0.05) 18px 19px
    ),
    oklch(0.215 0.042 258);
}
.left {
  transform: rotateY(-90deg) translateZ(110px);
}
.right {
  transform: rotateY(90deg) translateZ(110px);
}
.top {
  left: 0;
  right: 0;
  height: 140px;
  top: 50%;
  margin-top: -70px;
  transform: rotateX(90deg) translateZ(170px);
  background: oklch(0.25 0.042 258);
}

.unit {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  border-bottom: 1px solid oklch(0.95 0.012 85 / 0.16);
}
.unit:last-child {
  border-bottom: none;
}
.leds {
  display: flex;
  gap: 5px;
}
.led {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}
.led.on {
  background: oklch(0.95 0.012 85);
  animation: led-pulse 2.6s ease-in-out infinite;
}
.led.dim {
  background: oklch(0.95 0.012 85 / 0.35);
}
.unit-brand {
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: oklch(0.95 0.012 85 / 0.8);
}
.vents {
  margin-left: auto;
  width: 56%;
  height: 46%;
  background: repeating-linear-gradient(
    90deg,
    oklch(0.95 0.012 85 / 0.18) 0 2px,
    transparent 2px 7px
  );
}
.vents.wide {
  width: 70%;
}

.shadow {
  margin: 26px auto 0;
  width: 240px;
  height: 30px;
  border-radius: 50%;
  background: radial-gradient(ellipse, oklch(0 0 0 / 0.45), transparent 70%);
}

@keyframes bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
@keyframes led-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bob,
  .led.on {
    animation: none;
  }
  .rack {
    transition: none;
  }
}
</style>
