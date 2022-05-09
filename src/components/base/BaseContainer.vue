<template>
  <div
    class="container"
    :style="{ maxWidth: `calc(${maxWidth}px + var(--side-padding) * 2)` }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{ size: 'lg' | 'md' }>();
  let maxWidth = 0;
  switch (props.size) {
    case 'lg':
      maxWidth = 1800;
      break;
    case 'md':
      maxWidth = 1400;
      break;
  }
</script>

<style scoped>
  .container {
    --side-padding: 1rem;

    width: 100%;
    padding-right: var(--side-padding);
    padding-left: var(--side-padding);
    margin-right: auto;
    margin-left: auto;
  }
</style>
