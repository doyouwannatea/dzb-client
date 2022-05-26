<template>
  <input
    :value="modelValue"
    :class="['input', { 'with-icon': icon }]"
    :type="type"
    :disabled="disabled"
    :placeholder="placeholder"
    :style="{
      backgroundImage: icon && `url(${icon})`,
    }"
    @input="onInput"
  />
</template>

<script setup lang="ts">
  import { withDefaults } from 'vue';

  type Props = {
    modelValue?: string;
    type?: 'text' | 'date';
    placeholder?: string;
    disabled?: boolean;
    icon?: string;
  };
  type Emits = { (e: 'update:modelValue', value: string): void };

  withDefaults(defineProps<Props>(), {
    type: 'text',
    modelValue: '',
    placeholder: '',
    icon: undefined,
  });
  const emit = defineEmits<Emits>();

  function onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    emit('update:modelValue', target.value);
  }
</script>

<style scoped>
  .input {
    width: 100%;
    padding: 0.75rem 0.8rem;
    font-size: 1.125rem;
    color: var(--text-color);
    background-color: #fff;
    border: 1px solid var(--gray-color-1);
    border-radius: 0.3125rem;
  }

  .input.with-icon {
    padding-right: 4.25rem;
    background: calc(100% - 1rem) center / 2rem no-repeat #ffffff;
  }

  .input[type='date']::-webkit-inner-spin-button,
  .input[type='date']::-webkit-calendar-picker-indicator {
    margin: 0;
    opacity: 0.3;
  }

  .input::placeholder {
    font-size: 1.125rem;
    color: var(--gray-color-2);
  }

  .input:focus {
    outline: none;
  }

  .input:disabled {
    color: var(--gray-color-2);
    cursor: default;
    background-color: #f9f9f9;
  }

  .input:focus-visible {
    outline: 1px solid black;
  }
</style>
