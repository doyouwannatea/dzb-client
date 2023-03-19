<template>
  <component :is="props.is" :class="{ [$style.disabled]: props.disabled }">
    <p :class="$style['label-text']">
      {{ props.label }}
      <span v-if="props.required" :class="$style.required">*</span>
    </p>
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
  type Props = {
    label: string;
    required?: boolean;
    disabled?: boolean;
    is?: 'label' | 'div';
  };

  const props = withDefaults(defineProps<Props>(), {
    required: false,
    disabled: false,
    is: 'label',
  });
</script>

<style module lang="scss">
  .label-text {
    margin-bottom: 0.625rem;
    font-size: 1.125rem;
    font-weight: 700;
    cursor: default;
  }

  .required {
    font-weight: bold;
    color: var(--red-color-1);
  }

  .disabled {
    color: var(--gray-color-2);
  }
</style>
