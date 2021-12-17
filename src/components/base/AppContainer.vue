<template>
  <div class="container" :style="{ maxWidth: `${maxWidth}px` }">
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
    padding-left: 1rem;
    padding-right: 1rem;
    box-sizing: content-box;
    margin-left: auto;
    margin-right: auto;
  }
</style>
