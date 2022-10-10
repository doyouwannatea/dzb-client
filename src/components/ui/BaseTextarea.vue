<template>
  <label class="label">
    <p v-if="props.label" class="label-text">{{ props.label }}</p>
    <textarea
      v-bind="$attrs"
      :value="props.modelValue"
      class="input"
      :style="{ resize: props.resize }"
      @input="onInput"
    >
    </textarea>
  </label>
</template>

<script setup lang="ts">
  import { TextareaHTMLAttributes, withDefaults } from 'vue';

  interface Props extends TextareaHTMLAttributes {
    modelValue?: string;
    label?: string;
    resize: 'horizontal' | 'vertical' | 'both' | 'none';
  }

  interface Emits {
    (e: 'update:modelValue', value: string): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    label: undefined,
    resize: 'none',
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
