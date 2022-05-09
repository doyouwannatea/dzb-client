<template>
  <div
    class="row"
    :style="{
      gridTemplateColumns: gridTemplateCols($props.cols),
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ cols?: number | string }>();

  function gridTemplateCols(cols?: number | string): string {
    if (!cols) return '';
    if (typeof cols === 'string') return cols;

    let gridTemplateColsStr = '';
    for (let i = 0; i < cols; i++) {
      gridTemplateColsStr += '1fr ';
    }
    return gridTemplateColsStr;
  }
</script>

<style scoped>
  .row {
    --gap: 1.875rem;
    --border-color: var(--gray-color-1);

    display: grid;
    grid-template-columns: 1fr;
    row-gap: var(--gap);
  }

  .row > :deep(*:not(:last-child)) {
    padding-right: var(--gap);
    margin-right: var(--gap);
    border-right: 1px solid var(--border-color);
  }
</style>
