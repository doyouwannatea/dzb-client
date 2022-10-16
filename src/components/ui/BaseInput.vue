<template>
  <label class="label">
    <p v-if="props.label" class="label-text">{{ props.label }}</p>
    <input
      v-bind="$attrs"
      :ref="props.inputRef"
      :value="props.modelValue"
      :class="['input', { 'with-icon': props.icon }]"
      :style="{
        backgroundImage: props.icon && `url(${props.icon})`,
      }"
      @input="onInput"
    />
  </label>
</template>

<script setup lang="ts">
  import { Ref, InputHTMLAttributes, withDefaults } from 'vue';

  interface Props extends InputHTMLAttributes {
    modelValue?: string;
    icon?: string;
    label?: string;
    inputRef?: Ref<HTMLInputElement | null>;
  }

  interface Emits {
    (e: 'update:modelValue', value: string): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    icon: undefined,
    label: undefined,
    inputRef: undefined,
  });
  const emit = defineEmits<Emits>();

  function onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    emit('update:modelValue', target.value);
  }
</script>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    inheritAttrs: false,
  });
</script>

<style scoped>
  .label {
    display: inline-block;
    width: 100%;
  }

  .label-text {
    margin-bottom: 0.75rem;
    font-size: 1.125rem;
    font-weight: 700;
    color: #fff;
  }

  .input {
    width: 100%;
    padding: 0.75rem 0.8rem;
    font-size: 1.125rem;
    color: var(--text-color);
    background-color: #fff;
    border: 1px solid var(--gray-color-1);
    border-radius: 0.3125rem;
    transition: border 100ms ease;
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
    border: 1px solid black;
  }
</style>
