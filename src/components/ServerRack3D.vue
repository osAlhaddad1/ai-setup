<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

/**
 * A CSS-3D server node — the product itself as the hero visual.
 * Drag to spin it freely (with inertia); it keeps a slow idle rotation
 * when left alone. Navy body on the off-white page.
 */
const yaw = ref(-28)
const pitch = ref(-10)
const dragging = ref(false)

let lastX = 0
let lastY = 0
let velocity = 0
let raf = 0
let reducedMotion = false

function onDown(event: PointerEvent) {
  dragging.value = true
  velocity = 0
  lastX = event.clientX
  lastY = event.clientY
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}

function onMove(event: PointerEvent) {
  if (!dragging.value) return
  const dx = event.clientX - lastX
  const dy = event.clientY - lastY
  lastX = event.clientX
  lastY = event.clientY
  yaw.value += dx * 0.45
  pitch.value = Math.min(12, Math.max(-38, pitch.value - dy * 0.3))
  velocity = dx * 0.45
}

function onUp() {
  dragging.value = false
}

function tick() {
  if (!dragging.value) {
    if (Math.abs(velocity) > 0.05) {
      yaw.value += velocity
      velocity *= 0.94
    } else {
      yaw.value += 0.1
    }
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reducedMotion) raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))

type Unit = { kind: 'display' | 'drives' | 'vent' }
const units: Unit[] = [
  { kind: 'display' },
  { kind: 'drives' },
  { kind: 'vent' },
  { kind: 'drives' },
  { kind: 'vent' },
  { kind: 'drives' },
  { kind: 'vent' },
]
</script>

<template>
  <div class="wrap select-none">
    <div
      class="scene mx-auto"
      :class="dragging ? 'cursor-grabbing' : 'cursor-grab'"
      aria-label="3D model of an IRONNODE server — drag to rotate"
      role="img"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointercancel="onUp"
    >
      <div class="bob">
        <div
          class="rack"
          :style="{ transform: `rotateX(${pitch.toFixed(2)}deg) rotateY(${yaw.toFixed(2)}deg)` }"
        >
          <!-- front -->
          <div class="face front">
            <div v-for="(unit, i) in units" :key="i" class="unit">
              <template v-if="unit.kind === 'display'">
                <span class="led on" />
                <span class="unit-brand">IRONNODE</span>
                <span class="unit-model">T2·4U</span>
              </template>
              <template v-else-if="unit.kind === 'drives'">
                <span class="handle" /><span class="handle" />
                <span class="led on" :style="{ animationDelay: `${i * 0.6}s` }" />
                <span class="led dim" />
                <div class="vents" />
              </template>
              <template v-else>
                <span class="led dim" />
                <div class="vents wide" />
              </template>
            </div>
          </div>
          <!-- back: ports -->
          <div class="face back">
            <div v-for="i in 3" :key="i" class="port-row">
              <span v-for="p in 4" :key="p" class="port" />
            </div>
          </div>
          <!-- sides / top / bottom -->
          <div class="face left" />
          <div class="face right" />
          <div class="face top" />
          <div class="face bottom" />
        </div>
        <div class="shadow" :class="{ still: dragging }" />
      </div>
    </div>
    <p class="label-caps mt-6 text-center">Drag to rotate</p>
  </div>
</template>

<style scoped>
.scene {
  width: 400px;
  max-width: 100%;
  height: 500px;
  perspective: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
}
.bob {
  animation: bob 7s ease-in-out infinite;
}
.rack {
  position: relative;
  width: 260px;
  height: 400px;
  transform-style: preserve-3d;
}
.face {
  position: absolute;
  background: oklch(0.23 0.045 258);
}
.front {
  inset: 0;
  transform: translateZ(90px);
  display: flex;
  flex-direction: column;
  background: linear-gradient(160deg, oklch(0.3 0.05 258), oklch(0.21 0.045 258));
  border: 1px solid oklch(0.36 0.05 258);
}
.back {
  inset: 0;
  transform: rotateY(180deg) translateZ(90px);
  background: oklch(0.2 0.045 258);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 16px;
  padding: 24px;
}
.left,
.right {
  top: 0;
  bottom: 0;
  width: 180px;
  left: 50%;
  margin-left: -90px;
  background:
    repeating-linear-gradient(90deg, transparent 0 20px, oklch(0.965 0.007 85 / 0.07) 20px 21px),
    linear-gradient(180deg, oklch(0.25 0.045 258), oklch(0.2 0.045 258));
}
.left {
  transform: rotateY(-90deg) translateZ(130px);
}
.right {
  transform: rotateY(90deg) translateZ(130px);
  filter: brightness(0.85);
}
.top,
.bottom {
  left: 0;
  right: 0;
  height: 180px;
  top: 50%;
  margin-top: -90px;
}
.top {
  transform: rotateX(90deg) translateZ(200px);
  background:
    repeating-linear-gradient(0deg, transparent 0 14px, oklch(0.965 0.007 85 / 0.06) 14px 15px),
    repeating-linear-gradient(90deg, transparent 0 14px, oklch(0.965 0.007 85 / 0.06) 14px 15px),
    oklch(0.27 0.048 258);
}
.bottom {
  transform: rotateX(-90deg) translateZ(200px);
  background: oklch(0.17 0.04 258);
}

.unit {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  border-bottom: 1px solid oklch(0.965 0.007 85 / 0.16);
}
.unit:last-child {
  border-bottom: none;
}
.led {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.led.on {
  background: oklch(0.965 0.007 85);
  box-shadow: 0 0 6px oklch(0.965 0.007 85 / 0.8);
  animation: led-pulse 2.6s ease-in-out infinite;
}
.led.dim {
  background: oklch(0.965 0.007 85 / 0.3);
}
.handle {
  width: 4px;
  height: 40%;
  border: 1px solid oklch(0.965 0.007 85 / 0.35);
  border-radius: 1px;
}
.unit-brand {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.24em;
  color: oklch(0.965 0.007 85 / 0.9);
}
.unit-model {
  margin-left: auto;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: oklch(0.965 0.007 85 / 0.45);
}
.vents {
  margin-left: auto;
  width: 50%;
  height: 44%;
  background: repeating-linear-gradient(
    90deg,
    oklch(0.965 0.007 85 / 0.2) 0 2px,
    transparent 2px 8px
  );
}
.vents.wide {
  width: 68%;
}

.port-row {
  display: flex;
  gap: 12px;
}
.port {
  width: 26px;
  height: 12px;
  border: 1px solid oklch(0.965 0.007 85 / 0.3);
  background: oklch(0.965 0.007 85 / 0.06);
}

.shadow {
  margin: 30px auto 0;
  width: 280px;
  height: 34px;
  border-radius: 50%;
  background: radial-gradient(ellipse, oklch(0.21 0.045 258 / 0.3), transparent 70%);
}

@keyframes bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}
@keyframes led-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bob,
  .led.on {
    animation: none;
  }
}
</style>
