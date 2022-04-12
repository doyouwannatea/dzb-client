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

  type Variant = 'outlined' | 'link' | 'inline-link' | 'primary';
  type Is = 'button' | 'router-link' | 'a';
  type Case = 'uppercase' | 'lowercase';
  type Color = 'red';

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
    align-items: center;
    text-align: center;
    justify-content: center;
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

  .btn.red {
    --background-color: var(--red-color-1);
    --hover-color: var(--red-color-1);
    --active-color: var(--red-color-2);
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
    background-color: var(--hover-color);
    color: #fff;
  }

  .primary:active {
    background-color: var(--active-color);
    color: #fff;
  }

  .primary:disabled {
    background-color: var(--disabled-color);
  }

  .outlined {
    border: 0.125rem solid var(--background-color);
    background-color: transparent;
    color: var(--background-color);
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
    color: var(--disabled-color);
    border-color: var(--disabled-color);
    background-color: transparent;
  }

  .inline-link {
    padding: 0;
    font-size: 0.875rem;
    border-radius: 0;
    color: var(--background-color);
  }

  .inline-link:hover,
  .link:hover {
    text-decoration: underline;
    color: var(--background-color);
  }

  .inline-link:active,
  .link:active {
    color: var(--active-color);
  }

  .inline-link:disabled,
  .link:disabled {
    color: var(--disabled-color);
  }

  .link {
    color: var(--background-color);
  }
</style>
