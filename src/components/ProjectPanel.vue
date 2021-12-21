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
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.18);
    border-radius: 10px;
    padding: 32px;
    margin-top: 15px;
  }

  .row {
    display: grid;
    row-gap: 30px;
  }

  .row.row-2 {
    grid-template-columns: 1fr 1fr;
  }

  .row.row-3 {
    grid-template-columns: 4fr 4fr 2fr;
  }
</style>
