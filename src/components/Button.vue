<template>
  <button :disabled="disabled" :class="['btn', type]">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  interface Props {
    type?: 'outlined' | 'link';
    disabled?: boolean;
  }

  defineProps<Props>();
</script>

<style scoped>
  .btn {
    padding: 16px 32px;
    font-size: 16px;
    border: 0;
    border-radius: 5px;
    background-color: var(--accent-color-1);
    color: #ffffff;
    line-height: normal;
    text-transform: uppercase;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 20ms ease, color 20ms ease;
  }

  .btn:hover {
    background-color: #2248bb;
    color: #fff;
  }

  .btn:active {
    background-color: #3e8bff;
    color: #fff;
  }

  .btn:disabled {
    background-color: #a4a4a4;
    pointer-events: none;
  }

  .outlined {
    border: 2px solid var(--accent-color-1);
    background-color: #fff;
    color: var(--accent-color-1);
  }

  .outlined:hover {
    border-color: #2248bb;
  }

  .outlined:active {
    border-color: #3e8bff;
  }

  .outlined:disabled {
    color: #a4a4a4;
    border-color: #a4a4a4;
    background-color: transparent;
  }

  .link {
    display: inline-block;
    padding: 0;
    font-size: 14px;
    background-color: transparent;
    border-radius: 0;
    line-height: 18px;
    text-align: initial;
    text-transform: initial;
    color: var(--accent-color-1);
  }

  .link:hover {
    text-decoration: underline;
    color: var(--accent-color-1);
    background-color: transparent;
  }

  .link:active {
    color: #3e8bff;
    background-color: transparent;
  }

  .link:disabled {
    background-color: transparent;
    color: #a4a4a4;
  }
</style>
