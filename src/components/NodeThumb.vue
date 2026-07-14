<script setup lang="ts">
/** A miniature front-panel render of a node — the product-shot motif. */
defineProps<{ units: number }>()
</script>

<template>
  <div class="thumb" aria-hidden="true">
    <div v-for="unit in units" :key="unit" class="u">
      <span class="led" :class="{ dim: unit % 2 === 0 }" />
      <span class="vent" />
    </div>
  </div>
</template>

<style scoped>
.thumb {
  width: 132px;
  border: 1px solid oklch(0.21 0.045 258);
  background: linear-gradient(160deg, oklch(0.29 0.05 258), oklch(0.21 0.045 258));
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 24px -12px oklch(0.21 0.045 258 / 0.45);
}
.u {
  min-height: 15px;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 8px;
  border-bottom: 1px solid oklch(0.965 0.007 85 / 0.16);
}
.u:last-child {
  border-bottom: none;
}
.led {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: oklch(0.965 0.007 85);
  flex-shrink: 0;
}
.led.dim {
  opacity: 0.35;
}
.vent {
  margin-left: auto;
  width: 55%;
  height: 4px;
  background: repeating-linear-gradient(
    90deg,
    oklch(0.965 0.007 85 / 0.25) 0 2px,
    transparent 2px 6px
  );
}
</style>
