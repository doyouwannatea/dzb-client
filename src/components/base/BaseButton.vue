<template>
  <component
    :is="props.is"
    :disabled="props.disabled"
    :class="[
      'btn',
      props.variant,
      props.case,
      { 'full-width': props.fullWidth },
    ]"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
  import { withDefaults } from '@vue/runtime-core';

  type Variant = 'outlined' | 'link' | 'inline-link' | 'primary';
  type Is = 'button' | 'router-link';
  type Case = 'uppercase' | 'lowercase';

  type Props = {
    variant?: Variant;
    is?: Is;
    disabled?: boolean;
    fullWidth?: boolean;
    case?: Case;
  };

  const props = withDefaults(defineProps<Props>(), {
    is: 'button',
    variant: 'primary',
    disabled: false,
    fullWidth: false,
    case: undefined,
  });
</script>

<style scoped>
  .btn {
    --hover-color: #2248bb;
    --active-color: #3e8bff;

    display: inline-flex;
    align-items: center;
    gap: 0.8125rem;
    color: #ffffff;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border: 0;
    line-height: normal;
    border-radius: 0.3125rem;
    white-space: nowrap;
    cursor: pointer;
    background-color: transparent;
    transition: background-color 20ms ease, color 20ms ease;
    text-decoration: none;
  }

  .btn:disabled {
    pointer-events: none;
  }

  .full-width {
    width: 100%;
  }

  .uppercase {
    text-transform: uppercase;
  }
  .lowercase {
    text-transform: lowercase;
  }

  .primary {
    background-color: var(--accent-color-1);
  }

  .primary:hover {
    background-color: var(--hover-color);
    color: #fff;
  }

  .primary:active {
    background-color: var(--active-color);
    color: #fff;
  }

  .primary:disabled {
    background-color: var(--gray-color-2);
  }

  .outlined {
    border: 0.125rem solid var(--accent-color-1);
    background-color: #fff;
    color: var(--accent-color-1);
  }

  .outlined:hover {
    border-color: var(--hover-color);
    background-color: var(--hover-color);
    color: #fff;
  }

  .outlined:active {
    border-color: var(--active-color);
    background-color: var(--active-color);
    color: #fff;
  }

  .outlined:disabled {
    color: var(--gray-color-2);
    border-color: var(--gray-color-2);
    background-color: transparent;
  }

  .inline-link {
    padding: 0;
    font-size: 0.875rem;
    border-radius: 0;
    color: var(--accent-color-1);
  }

  .inline-link:hover,
  .link:hover {
    text-decoration: underline;
    color: var(--accent-color-1);
  }

  .inline-link:active,
  .link:active {
    color: var(--active-color);
  }

  .inline-link:disabled,
  .link:disabled {
    color: var(--gray-color-2);
  }

  .link {
    color: var(--accent-color-1);
  }
</style>
