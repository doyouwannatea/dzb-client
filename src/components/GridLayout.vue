<template>
  <div
    class="row"
    :style="{
      gridTemplateColumns: $props.colsCount
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

  .row > :deep(*:not(:last-child)) {
    padding-right: var(--gap);
    margin-right: var(--gap);
    border-right: 1px solid var(--border-color);
  }
</style>
