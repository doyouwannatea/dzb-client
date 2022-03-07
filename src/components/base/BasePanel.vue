<template>
  <div class="project-panel">
    <div :class="['row', `row-${cols}`]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { withDefaults } from 'vue';

  withDefaults(defineProps<{ cols: 1 | 2 | 3 }>(), {
    cols: 1,
  });
</script>

<style scoped>
  .project-panel {
    background: #ffffff;
    box-shadow: 0px 0px 0.3125rem rgba(0, 0, 0, 0.18);
    border-radius: 0.625rem;
    padding: 2rem;
    margin-bottom: 0.9375rem;
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

  .project-panel:deep(.row > *:not(:last-child)) {
    padding-right: 1.875rem;
    margin-right: 1.875rem;
    border-right: 1px solid var(--gray-color-1);
  }
</style>
