<template>
  <div class="container" :style="{ maxWidth: cssCalc(maxWidth, '+', '1rem') }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { cssCalc } from '@/helpers';

  const props = defineProps<{ size: 'lg' | 'md' }>();
  let maxWidth = '0px';
  if (props.size === 'lg') {
    maxWidth = '1800px';
  } else if (props.size === 'md') {
    maxWidth = '1400px';
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
