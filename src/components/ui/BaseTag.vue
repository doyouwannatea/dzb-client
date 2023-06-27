<template>
  <span :class="['tag', props.variant, { disabled: props.disabled }]">
    <!-- @slot Контент внутри тега -->
    <slot></slot>
    <button
      v-if="props.deletable"
      class="multiselect-tag-remove remove-btn"
      @click="emit('delete')"
    >
      <span class="multiselect-tag-remove-icon"></span>
    </button>
  </span>
</template>

<script setup lang="ts">
  export type TagVariant = 'primary' | 'outlined';
  type Props = {
    /**
     * Вариант тега
     */
    variant?: TagVariant;
    /**
     * Тег вкл / выкл
     */
    disabled?: boolean;
    /**
     * Добавляет к компоненту кнопку удаления
     */
    deletable?: boolean;
  };
  type Emits = {
    /**
     * Событие при нажатии на кнопку удаления
     */
    (event: 'delete'): void;
  };

  const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    disabled: false,
  });
  const emit = defineEmits<Emits>();
</script>

<style scoped lang="scss">
  .tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.4375rem 1.25rem;
    font-size: 0.875rem;
    line-height: 1.125rem;
    color: var(--accent-color-1);
    background: #f1f4fe;
    border-radius: 1.875rem;

    &.outlined {
      background-color: transparent;
      border: 1px solid var(--accent-color-1);
    }

    &.disabled {
      color: var(--gray-color-2);
      background: var(--gray-color-1);
    }
  }

  .remove-btn {
    gap: 0.5rem;
    color: var(--accent-color-1);
    cursor: pointer;
    background-color: transparent;
    border: none;
    border-radius: 50%;

    &:hover {
      background-color: #cbd7ff;
    }
  }
</style>
