<template>
  <span :class="['tag', { disabled }]">
    <slot></slot>
    <button
      v-if="deletable"
      class="multiselect-tag-remove remove-btn"
      @click="$emit('delete')"
    >
      <span class="multiselect-tag-remove-icon"></span>
    </button>
  </span>
</template>

<script setup lang="ts">
  import { withDefaults } from 'vue';

  type Props = { disabled?: boolean; deletable?: boolean };
  type Emits = { (e: 'delete'): void };
  withDefaults(defineProps<Props>(), { disabled: false, remove: undefined });
  defineEmits<Emits>();
</script>

<style scoped>
  .tag {
    display: inline-flex;
    justify-content: center;
    align-items: center;
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

  .remove-btn {
    border: none;
    border-radius: 50%;
    gap: 0.5rem;
    cursor: pointer;
    color: var(--accent-color-1);
    background-color: transparent;
  }

  .remove-btn:hover {
    background-color: #cbd7ff;
  }
</style>
