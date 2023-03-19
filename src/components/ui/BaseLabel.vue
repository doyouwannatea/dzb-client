<template>
  <label :class="{ disabled: $style.disabled }">
    <p :class="$style['label-text']">
      {{ props.label }}
      <span v-if="props.required" :class="$style.required">*</span>
    </p>
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
  type Props = {
    label: string;
    required?: boolean;
    disabled?: boolean;
  };

  const props = withDefaults(defineProps<Props>(), {
    required: false,
    disabled: false,
  });
</script>

<style module lang="scss">
  .label-text {
    margin-bottom: 0.625rem;
    font-size: 1.125rem;
    font-weight: 700;
  }

  .required {
    font-weight: bold;
    color: var(--red-color-1);
  }

  .disabled {
    color: var(--gray-color-2);
  }
</style>
