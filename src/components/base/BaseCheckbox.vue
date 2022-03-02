<template>
  <label :aria-disabled="disabled" class="label">
    <input
      :disabled="disabled"
      class="checkbox"
      :checked="checked"
      type="checkbox"
      :value="value"
      @change="onChange"
    />
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';

  type Props = {
    modelValue?: unknown[];
    value: unknown;
    disabled?: boolean;
  };
  type Emits = { (e: 'update:modelValue', value: unknown): void };

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const checked = ref(false);

  watch(
    () => props.modelValue,
    () => (checked.value = includesValue()),
    { immediate: true },
  );

  function onChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (!props.modelValue) return;
    if (props.disabled) return;
    if (target.checked) addValue(props.modelValue, props.value);
    else removeValue(props.modelValue, props.value);
  }

  function addValue(arr: unknown[], value: unknown) {
    emit('update:modelValue', [...arr, value]);
  }

  function removeValue(arr: unknown[], value: unknown) {
    emit(
      'update:modelValue',
      arr.filter((i) => i !== value),
    );
  }

  function includesValue(): boolean {
    return Boolean(props.modelValue?.includes(props.value));
  }
</script>

<style scoped>
  .label[aria-disabled='true'] {
    color: var(--gray-color-2) !important;
    cursor: default !important;
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

  .checkbox {
    appearance: none;
    border: 1px solid var(--gray-color-2);
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 0.1875rem;
    position: relative;
  }

  .checkbox:checked {
    background-color: var(--accent-color-1);
    border: none;
  }

  .checkbox:checked::before {
    content: '\2713';
    position: absolute;
    color: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: normal;
  }
</style>
