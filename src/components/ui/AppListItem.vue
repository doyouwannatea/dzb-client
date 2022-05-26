<template>
  <li :class="['info-list-item', { wide }]">
    <h2 class="info-list-title">
      <slot name="title"></slot>
    </h2>
    <span :class="['info-list-value', { bold }]">
      <slot></slot>
    </span>
  </li>
</template>

<script setup lang="ts">
  import { withDefaults } from 'vue';

  withDefaults(
    defineProps<{
      bold?: boolean;
      wide?: boolean;
    }>(),
    {
      bold: true,
      wide: false,
    },
  );
</script>

<style scoped>
  .bold {
    font-weight: 700;
    line-height: 1.4375rem;
  }

  .info-list-title {
    font-size: inherit;
    font-weight: 600;
    line-height: normal;
  }
  .info-list-item {
    display: grid;
    grid-template-columns: 5fr 6fr;
    align-items: flex-start;
    line-height: 1.6875rem;
  }

  .info-list-value {
    padding-left: 1em;
  }

  .info-list-item.wide {
    grid-template-columns: minmax(auto, 14.375rem) auto;
  }
</style>
