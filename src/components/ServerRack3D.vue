<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

/**
 * A CSS-3D server node built from 21 solid shards.
 * It follows the cursor from anywhere on the page; hovering it shatters
 * the shards across the hero, and they reassemble when the cursor leaves.
 */
const ROWS = 7
const COLS = 3
const PIECE_W = 80
const PIECE_H = 54

interface Piece {
  row: number
  col: number
  style: Record<string, string>
}

function scatter(range: number, min = 0): number {
  const sign = Math.random() < 0.5 ? -1 : 1
  return sign * (min + Math.random() * range)
}

const pieces: Piece[] = []
for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    pieces.push({
      row,
      col,
      style: {
        left: `${col * PIECE_W}px`,
        top: `${row * PIECE_H}px`,
        '--sx': `${scatter(320, 140).toFixed(0)}px`,
        '--sy': `${scatter(220, 60).toFixed(0)}px`,
        '--sz': `${(-140 + Math.random() * 480).toFixed(0)}px`,
        '--rx': `${scatter(160).toFixed(0)}deg`,
        '--ry': `${scatter(160).toFixed(0)}deg`,
        '--rz': `${scatter(120).toFixed(0)}deg`,
        '--d': `${(Math.random() * 0.12).toFixed(3)}s`,
      },
    })
  }
}

const shattered = ref(false)
const yaw = ref(-28)
const pitch = ref(-10)
let reducedMotion = false

function onWindowMove(event: PointerEvent) {
  const px = event.clientX / window.innerWidth
  const py = event.clientY / window.innerHeight
  yaw.value = -28 + (px - 0.5) * 30
  pitch.value = -10 + (0.5 - py) * 14
}

function onEnter() {
  if (!reducedMotion) shattered.value = true
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reducedMotion) window.addEventListener('pointermove', onWindowMove)
})
onUnmounted(() => window.removeEventListener('pointermove', onWindowMove))
</script>

<template>
  <div class="wrap select-none">
    <div
      class="scene mx-auto"
      role="img"
      aria-label="3D model of an IRONNODE server — hover to shatter it apart"
      @pointerenter="onEnter"
      @pointerleave="shattered = false"
    >
      <div class="bob">
        <div
          class="rack"
          :class="{ shattered }"
          :style="{ transform: `rotateX(${pitch.toFixed(2)}deg) rotateY(${yaw.toFixed(2)}deg)` }"
        >
          <div v-for="(piece, i) in pieces" :key="i" class="piece" :style="piece.style">
            <div class="pf">
              <span
                v-if="piece.col === 0"
                class="led"
                :class="piece.row % 2 === 0 ? 'on' : 'dim'"
                :style="{ animationDelay: `${(i % 5) * 0.5}s` }"
              />
              <span v-if="piece.col === 1 && piece.row === 0" class="unit-brand">IRONNODE</span>
              <div v-if="piece.col === 2" class="vents" />
            </div>
            <div class="pb" />
            <div v-if="piece.col === 0" class="ps psl" />
            <div v-if="piece.col === COLS - 1" class="ps psr" />
            <div v-if="piece.row === 0" class="pc pct" />
            <div v-if="piece.row === ROWS - 1" class="pc pcb" />
          </div>
        </div>
        <div class="shadow" />
      </div>
    </div>
    <p class="label-caps mt-6 text-center">Touch the node</p>
  </div>
</template>

<style scoped>
.scene {
  width: 420px;
  max-width: 100%;
  height: 500px;
  perspective: 1300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bob {
  animation: bob 7s ease-in-out infinite;
}
.rack {
  position: relative;
  width: 240px;
  height: 378px;
  transform-style: preserve-3d;
  transition: transform 0.4s ease-out;
}

.piece {
  position: absolute;
  width: 80px;
  height: 54px;
  transform-style: preserve-3d;
  transition: transform 0.9s cubic-bezier(0.2, 0.7, 0.25, 1);
  transition-delay: var(--d);
}
.rack.shattered .piece {
  transform: translate3d(var(--sx), var(--sy), var(--sz)) rotateX(var(--rx)) rotateY(var(--ry))
    rotateZ(var(--rz));
}

/* faces of each shard */
.pf,
.pb {
  position: absolute;
  inset: 0;
}
.pf {
  transform: translateZ(70px);
  background: linear-gradient(160deg, oklch(0.29 0.05 258), oklch(0.22 0.045 258));
  border-bottom: 1px solid oklch(0.965 0.007 85 / 0.16);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
}
.pb {
  transform: rotateY(180deg) translateZ(70px);
  background: oklch(0.19 0.042 258);
}
.ps {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 140px;
  left: 50%;
  margin-left: -70px;
  background: linear-gradient(180deg, oklch(0.25 0.045 258), oklch(0.21 0.045 258));
}
.psl {
  transform: rotateY(-90deg) translateZ(40px);
}
.psr {
  transform: rotateY(90deg) translateZ(40px);
  filter: brightness(0.82);
}
.pc {
  position: absolute;
  left: 0;
  right: 0;
  height: 140px;
  top: 50%;
  margin-top: -70px;
}
.pct {
  transform: rotateX(90deg) translateZ(27px);
  background: oklch(0.27 0.048 258);
}
.pcb {
  transform: rotateX(-90deg) translateZ(27px);
  background: oklch(0.17 0.04 258);
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
.unit-brand {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.24em;
  color: oklch(0.965 0.007 85 / 0.9);
  white-space: nowrap;
}
.vents {
  margin-left: auto;
  width: 72%;
  height: 40%;
  background: repeating-linear-gradient(
    90deg,
    oklch(0.965 0.007 85 / 0.2) 0 2px,
    transparent 2px 8px
  );
}

.shadow {
  margin: 32px auto 0;
  width: 280px;
  height: 34px;
  border-radius: 50%;
  background: radial-gradient(ellipse, oklch(0.21 0.045 258 / 0.3), transparent 70%);
  transition: opacity 0.6s;
}
.rack.shattered ~ .shadow {
  opacity: 0.3;
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
  .rack,
  .piece {
    transition: none;
  }
}
</style>
