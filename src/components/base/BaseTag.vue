<template>
  <span :class="['tag', { disabled }]">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
  import { withDefaults } from 'vue';

  type Props = { disabled?: boolean };
  withDefaults(defineProps<Props>(), { disabled: false });
</script>

<style scoped>
  .tag {
    display: inline-block;
    padding: 0.4375rem 1.25rem;
    background: #f1f4fe;
    border-radius: 1.875rem;

    font-size: 0.875rem;
    line-height: 1.125rem;

    color: var(--accent-color-1);
  }

  .tag.disabled {
    background: var(--gray-color-1);
    color: var(--gray-color-2);
  }
</style>
