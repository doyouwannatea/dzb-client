<template>
  <component
    :is="props.is"
    :disabled="props.disabled"
    :class="['button', props.variant, props.color]"
    :style="{
      textTransform: props.case,
      width: props.fullWidth ? '100%' : 'auto',
    }"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
  import { withDefaults } from '@vue/runtime-core';

  export type Variant = 'outlined' | 'link' | 'inline-link' | 'primary' | 'tag';
  type Is = 'button' | 'router-link' | 'a';
  type Case = 'uppercase' | 'lowercase' | 'none';
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

<style scoped lang="scss">
  .button {
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

    &.red {
      --background-color: var(--red-color-1);
      --hover-color: var(--red-color-1);
      --active-color: var(--red-color-2);
    }

    &.white {
      --background-color: #fff;
      --hover-color: var(--gray-color-1);
      --active-color: var(--gray-color-2);
    }

    &:disabled {
      pointer-events: none;
    }
  }

  // A.K.A. "Silent Classes"
  %primary {
    background-color: var(--background-color);

    &:hover {
      color: #fff;
      background-color: var(--hover-color);
    }

    &:active {
      color: #fff;
      background-color: var(--active-color);
    }

    &:disabled {
      background-color: var(--disabled-color);
    }
  }

  // Наследует стили %primary
  .primary {
    @extend %primary;
  }

  .outlined {
    color: var(--background-color);
    background-color: transparent;
    border: 0.125rem solid var(--background-color);

    &:hover {
      color: #fff;
      background-color: var(--hover-color);
      border-color: var(--hover-color);
    }

    &.white:hover {
      color: var(--text-color);
    }

    &:active {
      color: #fff;
      background-color: var(--active-color);
      border-color: var(--active-color);
    }

    &.white:active {
      color: var(--text-color);
    }

    &:disabled {
      color: var(--disabled-color);
      background-color: transparent;
      border-color: var(--disabled-color);
    }
  }

  .inline-link {
    padding: 0;
    font-size: 0.875rem;
    border-radius: 0;
  }

  .link,
  .inline-link {
    color: var(--background-color);

    &:hover {
      color: var(--background-color);
      text-decoration: underline;
    }

    &:active {
      color: var(--active-color);
    }

    &:disabled {
      color: var(--disabled-color);
    }
  }

  // Наследует стили %primary
  .tag {
    @extend %primary;

    padding: 0.4375rem 1.25rem;
    font-size: 0.875rem;
    color: var(--light-color);
    background: var(--accent-color-1);
    border: 1px solid var(--light-color);
    border: none;
    border-radius: 6.25rem;
  }
</style>
