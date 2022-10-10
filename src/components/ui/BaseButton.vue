<template>
  <component
    :is="props.is"
    :disabled="props.disabled"
    :class="[
      'btn',
      props.variant,
      props.case,
      props.color,
      { 'full-width': props.fullWidth },
    ]"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
  import { withDefaults } from '@vue/runtime-core';

  export type Variant = 'outlined' | 'link' | 'inline-link' | 'primary';
  type Is = 'button' | 'router-link' | 'a';
  type Case = 'uppercase' | 'lowercase';
  type Color = 'red' | 'white';

  type Props = {
    variant?: Variant;
    is?: Is;
    disabled?: boolean;
    fullWidth?: boolean;
    case?: Case;
    color?: Color;
  };

  const props = withDefaults(defineProps<Props>(), {
    is: 'button',
    variant: 'primary',
    disabled: false,
    fullWidth: false,
    case: 'uppercase',
    color: undefined,
  });
</script>

<style scoped>
  .btn {
    --background-color: var(--accent-color-1);
    --disabled-color: var(--gray-color-2);
    --hover-color: #2248bb;
    --active-color: #3e8bff;

    display: inline-flex;
    gap: 0.8125rem;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    line-height: normal;
    color: var(--light-color);
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    border-radius: 0.3125rem;
    transition: background-color 20ms ease, color 20ms ease;
  }

  .btn.red {
    --background-color: var(--red-color-1);
    --hover-color: var(--red-color-1);
    --active-color: var(--red-color-2);
  }

  .btn.white {
    --background-color: #fff;
    --hover-color: var(--gray-color-1);
    --active-color: var(--gray-color-2);
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
    background-color: var(--background-color);
  }

  .primary:hover {
    color: #fff;
    background-color: var(--hover-color);
  }

  .primary:active {
    color: #fff;
    background-color: var(--active-color);
  }

  .primary:disabled {
    background-color: var(--disabled-color);
  }

  .outlined {
    color: var(--background-color);
    background-color: transparent;
    border: 0.125rem solid var(--background-color);
  }

  .outlined:hover {
    color: #fff;
    background-color: var(--hover-color);
    border-color: var(--hover-color);
  }

  .outlined.white:hover {
    color: var(--text-color);
  }

  .outlined:active {
    color: #fff;
    background-color: var(--active-color);
    border-color: var(--active-color);
  }

  .outlined.white:active {
    color: var(--text-color);
  }

  .outlined:disabled {
    color: var(--disabled-color);
    background-color: transparent;
    border-color: var(--disabled-color);
  }

  .inline-link {
    padding: 0;
    font-size: 0.875rem;
    color: var(--background-color);
    border-radius: 0;
  }

  .link {
    color: var(--background-color);
  }

  .inline-link:hover,
  .link:hover {
    color: var(--background-color);
    text-decoration: underline;
  }

  .inline-link:active,
  .link:active {
    color: var(--active-color);
  }

  .inline-link:disabled,
  .link:disabled {
    color: var(--disabled-color);
  }
</style>
