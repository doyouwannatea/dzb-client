<template>
  <div class="container" :style="{ maxWidth: `calc(${maxWidth}px + 1rem)` }">
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
    width: 100%;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-left: auto;
    margin-right: auto;
  }
</style>
