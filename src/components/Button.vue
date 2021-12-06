<template>
  <button
    :class="[
      'btn',
      {
        outlined: type === 'outlined',
        link: type === 'link',
      },
    ]"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  defineProps<{ type?: 'outlined' | 'link' }>();
</script>

<style scoped>
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 32px;
    font-size: 16px;
    background: var(--accent-color-1);
    border-radius: 5px;

    line-height: 20px;
    text-align: center;
    text-transform: uppercase;
    white-space: nowrap;

    color: #ffffff;

    border: 0;
    cursor: pointer;
  }

  .outlined {
    border: 2px solid var(--accent-color-1);
    background: #fff;
    color: var(--accent-color-1);
  }

  .link {
    display: inline-block;
    padding: 0;
    font-size: 14px;
    background: transparent;
    border-radius: 0;
    line-height: 18px;
    text-align: initial;
    text-transform: initial;
    color: var(--accent-color-1);
  }
</style>
