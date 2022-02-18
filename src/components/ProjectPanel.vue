<template>
  <div class="project-panel">
    <div :class="['row', `row-${cols}`]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue';

  defineProps({
    cols: {
      type: Number as PropType<1 | 2 | 3>,
      default: 1,
    },
  });
</script>

<style scoped>
  .project-panel {
    background: #ffffff;
    box-shadow: 0px 0px 0.3125rem rgba(0, 0, 0, 0.18);
    border-radius: 0.625rem;
    padding: 2rem;
    margin-top: 0.9375rem;
  }

  .row {
    display: grid;
    row-gap: 1.875rem;
  }

  .row.row-2 {
    grid-template-columns: 1fr 1fr;
  }

  .row.row-3 {
    grid-template-columns: 4fr 4fr 2fr;
  }
</style>
