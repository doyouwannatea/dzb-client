<template>
  <li :class="['info-list-item', { wide }]">
    <h2 class="info-list-title">{{ title }}</h2>
    <span :class="['info-list-value', { bold }]">
      <slot></slot>
    </span>
  </li>
</template>

<script setup lang="ts">
  defineProps({
    title: { type: String, required: true },
    bold: { type: Boolean, default: true },
    wide: Boolean,
  });
</script>

<style scoped>
  .bold {
    line-height: 23px;
    font-weight: 700;
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
    line-height: 27px;
  }

  .info-list-value {
    padding-left: 1em;
  }

  .info-list-item.wide {
    grid-template-columns: minmax(auto, 230px) auto;
  }
</style>
