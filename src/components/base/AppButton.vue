<template>
  <component
    :is="is"
    :disabled="disabled"
    :class="['btn', variant, { 'full-width': fullWidth }]"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
  import type { PropType } from '@vue/runtime-core';

  type Variant = 'outlined' | 'link' | 'inline-link';
  type Is = 'button' | 'router-link';

  defineProps({
    variant: { type: String as PropType<Variant>, default: '' as Variant },
    is: { type: String as PropType<Is>, default: 'button' as Is },
    disabled: Boolean,
    fullWidth: Boolean,
  });
</script>

<style scoped>
  .btn {
    display: block;
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
    text-decoration: none;
  }

  .btn.wrapper {
    padding: 0;
  }

  .full-width {
    width: 100%;
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
    background-color: var(--gray-color-2);
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
    color: var(--gray-color-2);
    border-color: var(--gray-color-2);
    background-color: transparent;
  }

  .inline-link {
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

  .inline-link:hover,
  .link:hover {
    text-decoration: underline;
    color: var(--accent-color-1);
    background-color: transparent;
  }

  .inline-link:active,
  .link:active {
    color: #3e8bff;
    background-color: transparent;
  }

  .inline-link:disabled,
  .link:disabled {
    background-color: transparent;
    color: var(--gray-color-2);
  }

  .link {
    background-color: transparent;
    color: var(--accent-color-1);
  }
</style>
