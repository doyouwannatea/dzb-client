<template>
  <label class="label">
    <p v-if="props.label" class="label-text">{{ props.label }}</p>
    <textarea
      v-bind="$attrs"
      :value="props.modelValue"
      :class="['input', { 'with-maxlength': isMaxLength }]"
      :style="{ resize: props.resize }"
      @input="onInput"
    >
    </textarea>
    <span v-if="isMaxLength" class="maxlength">
      {{ props.modelValue.length || 0 }}/{{ $attrs.maxlength }}
    </span>
  </label>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    inheritAttrs: false,
  });
</script>

<script setup lang="ts">
  import {
    TextareaHTMLAttributes,
    withDefaults,
    useAttrs,
    computed,
  } from 'vue';

  export type TextareaResize = 'horizontal' | 'vertical' | 'both' | 'none';

  interface Props extends TextareaHTMLAttributes {
    /**
     * Значение инпута
     */
    modelValue?: string;
    /**
     * Заголовок над инпутом
     * @deprecated используйте компонент <BaseLabel />
     */
    label?: string;
    /**
     * Растягивание поля ввода по X/Y
     */
    resize?: TextareaResize;
  }

  interface Emits {
    /**
     * Обновление строчки modelValue
     *
     * @event update:modelValue
     * @property {string} value новая строчка
     */
    (e: 'update:modelValue', value: string): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    label: undefined,
    resize: 'none',
  });
  const emit = defineEmits<Emits>();
  const attrs = useAttrs();
  const isMaxLength = computed(
    () =>
      typeof attrs.maxlength === 'number' ||
      typeof attrs.maxlength === 'string',
  );

  function onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    emit('update:modelValue', target.value);
  }
</script>

<style scoped>
  .label {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .maxlength {
    position: absolute;
    right: 1.25rem;
    bottom: 0.625rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--gray-color-2);
    user-select: none;
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

  .input.with-maxlength {
    padding-bottom: 2.5rem;
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
    background-color: var(--gray-color-4);
  }

  .input:focus-visible {
    border: 1px solid var(--accent-color-1);
  }
</style>
