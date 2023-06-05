<template>
  <div
    :class="[
      'row',
      {
        mobile: !props.cols || props.cols === 1,
      },
    ]"
    :style="{
      gridTemplateColumns: getGridTemplateColumns(props.cols),
    }"
  >
    <!-- @slot Контент макета -->
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  type Props = {
    /**
     * Размер и количество колонок макета:<br>
     * <code>number</code>: количество одинаковых по размеру колонок.<br>
     * <code>string</code>: соответствует значению из свойства <code>grid-template-columns</code>.
     */
    cols?: number | string;
  };
  const props = defineProps<Props>();

  function getGridTemplateColumns(cols?: number | string): string {
    if (!cols) return '';
    if (typeof cols === 'string') return cols;

    let gridTemplateColsStr = '';
    for (let i = 0; i < cols; i++) {
      gridTemplateColsStr += '1fr ';
    }
    return gridTemplateColsStr;
  }
</script>

<style lang="scss" scoped>
  .row {
    --gap: 1.875rem;
    --border-color: var(--gray-color-1);

    display: grid;
    grid-template-columns: 1fr;
    row-gap: var(--gap);

    & > :deep(*:not(:last-child)) {
      padding-right: var(--gap);
      margin-right: var(--gap);
      border-right: 1px solid var(--border-color);
    }

    &.mobile {
      & > :deep(*:not(:last-child)) {
        padding-right: 0;
        padding-bottom: var(--gap);
        margin-right: 0;
        border-right: none;
        border-bottom: 1px solid var(--border-color);
      }
    }
  }
</style>
