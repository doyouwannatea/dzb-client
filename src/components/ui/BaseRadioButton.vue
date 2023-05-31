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
    <!-- @slot Имя чекбокса -->
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  type Props = {
    /**
     * Значение для всех радио-кнопок
     */
    modelValue?: unknown;
    /**
     * Значение, привязанное к кнопке
     */
    value: unknown;
    /**
     * Кнопка вкл / выкл
     */
    disabled?: boolean;
  };
  type Emits = {
    /**
     * Замена modelValue
     *
     * @event update:modelValue
     * @property {unknown} value заменяет modelValue новым массивом с элементом чекбокса, или без него
     */
    (e: 'update:modelValue', value: unknown): void;
  };

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();
  const checked = computed(() => props.modelValue === props.value);
  defineExpose({ checked });

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
    position: relative;
    width: 1.25rem;
    min-width: 1.25rem;
    height: 1.25rem;
    border: 1px solid var(--gray-color-2);
    border-radius: 50%;
    appearance: none;
  }

  .radio:checked {
    background-color: var(--accent-color-1);
    border-color: var(--accent-color-1);
    box-shadow: inset 0 0 0 0.1875rem #fff;
  }

  .label {
    display: flex;
    gap: 0.9375rem;
    align-items: center;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: normal;
    color: var(--text-color);
  }

  .label:hover {
    color: var(--accent-color-1);
    cursor: pointer;
  }
</style>
