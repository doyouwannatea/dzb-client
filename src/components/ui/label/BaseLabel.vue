<template>
  <component :is="props.is" :class="{ [$style.disabled]: props.disabled }">
    <p v-if="props.label" :class="$style['label-text']">
      <slot name="label" :label="props.label" :required="props.required">
        {{ props.label }}
        <LabelRequiredIcon v-if="props.required" />
      </slot>
    </p>
    <slot name="default"></slot>
  </component>
</template>

<script setup lang="ts">
  import LabelRequiredIcon from './LabelRequiredIcon.vue';

  type Props = {
    label?: string;
    required?: boolean;
    disabled?: boolean;
    is?: 'label' | 'div';
  };

  const props = withDefaults(defineProps<Props>(), {
    required: false,
    disabled: false,
    label: undefined,
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
