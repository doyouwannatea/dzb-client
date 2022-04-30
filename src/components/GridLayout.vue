<template>
  <div
    class="row"
    :style="{
      '--grid-template-columns': $props.colsCount
        ? gridTemplateCols($props.colsCount)
        : '',
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ colsCount?: number }>();

  function gridTemplateCols(colsCount: number): string {
    let cols = '';
    for (let i = 0; i < colsCount; i++) {
      cols += '1fr ';
    }
    return cols;
  }
</script>

<style scoped>
  .row {
    --grid-template-columns: 1fr;
    --gap: 1.875rem;
    --border-color: var(--gray-color-1);

    display: grid;
    row-gap: var(--gap);
    grid-template-columns: var(--grid-template-columns);
  }

  /* .row.row-2 {
    grid-template-columns: 1fr 1fr;
  }

  .row.row-3 {
    grid-template-columns: 4fr 4fr 2fr;
  } */

  .row > :deep(*:not(:last-child)) {
    padding-right: var(--gap);
    margin-right: var(--gap);
    border-right: 1px solid var(--border-color);
  }
</style>
