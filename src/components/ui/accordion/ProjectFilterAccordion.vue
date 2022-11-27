<template>
  <SimpleAccordion default-opened class="accordion">
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #content>
      <slot name="content"></slot>
    </template>
  </SimpleAccordion>
</template>

<script setup lang="ts">
  import SimpleAccordion from './SimpleAccordion.vue';
</script>

<style scoped>
  .accordion {
    --side-padding: 1.375rem;
  }

  .accordion:deep(.title) {
    display: flex;
    flex-flow: row-reverse;
    gap: 0.75rem;
    align-items: center;
    justify-content: flex-end;
    padding: 1.0625rem var(--side-padding);
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.625rem;
    color: var(--text-color);
    cursor: pointer;
  }

  .accordion:deep(.title:hover) {
    color: var(--accent-color-1);
  }

  .accordion:deep(.icon) {
    width: 1rem;
    height: 0.625rem;
  }

  .accordion:deep(.content) {
    padding-right: var(--side-padding);
    padding-bottom: 1.8125rem;
    padding-left: var(--side-padding);
    margin-top: 0.375rem;
  }
</style>
