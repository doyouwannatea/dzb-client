<template>
  <component
    :is="props.is"
    :class="[$style.label, { [$style.disabled]: props.disabled }]"
  >
    <p v-if="props.label" :class="$style['label-text']">
      <!-- @slot Слот для изменения вёрстки заголовка лейбла. Если нет необходимости менять вёрстку используйте props.label -->
      <slot name="label" :label="props.label" :required="props.required">
        {{ props.label }}
        <LabelRequiredIcon v-if="props.required" />
      </slot>
    </p>
    <!-- @slot Контент который оборачивает лейбл -->
    <slot name="default"></slot>
  </component>
</template>

<script setup lang="ts">
  import LabelRequiredIcon from './LabelRequiredIcon.vue';

  export type Is = 'label' | 'fieldset' | 'div';

  type Props = {
    /**
     * Заголовок лейбла
     */
    label?: string;
    /**
     * Отображение <b style="color: red;">*</b> возле лейбла
     */
    required?: boolean;
    /**
     * Лейбл вкл / выкл
     */
    disabled?: boolean;
    /**
     * Вариант лейбла.<br>
     * Для инпутов лучше использовать <code>label</code>, для кастомных инпутов <code>div</code> и т.д.
     */
    is?: Is;
  };

  const props = withDefaults(defineProps<Props>(), {
    required: false,
    disabled: false,
    label: undefined,
    is: 'label',
  });
</script>

<style module lang="scss">
  .label {
    padding: 0;
    border: none;
  }

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
