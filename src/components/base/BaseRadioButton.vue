<template>
  <label :aria-disabled="disabled" class="label">
    <input
      :disabled="disabled"
      class="radio"
      :checked="checked"
      type="radio"
      :value="value"
      @change="onChange"
    />
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';

  type Props = {
    modelValue?: unknown;
    value: unknown;
    disabled?: boolean;
  };
  type Emits = { (e: 'update:modelValue', value: unknown): void };

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const checked = ref(false);

  watch(
    () => props.modelValue,
    (val) => {
      checked.value = val === props.value;
    },
    { immediate: true },
  );

  function onChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (props.disabled) return;
    if (target.checked) {
      emit('update:modelValue', props.value);
    }
  }
</script>

<style scoped>
  .label[aria-disabled='true'] {
    color: var(--gray-color-2) !important;
    cursor: default !important;
  }

  .radio {
    appearance: none;
    border: 1px solid var(--gray-color-2);
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    position: relative;
  }

  .radio:checked {
    border-color: var(--accent-color-1);
    box-shadow: inset 0 0 0px 0.1875rem #fff;
    background-color: var(--accent-color-1);
  }

  .label {
    font-weight: 400;
    font-size: 1.125rem;
    line-height: normal;
    display: flex;
    align-items: center;
    color: var(--text-color);
    gap: 0.9375rem;
  }

  .label:hover {
    color: var(--accent-color-1);
    cursor: pointer;
  }
</style>
