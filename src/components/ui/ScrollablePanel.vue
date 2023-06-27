<template>
  <section
    :class="$style.panel"
    :style="{ height: props.disableScroll ? 'auto' : props.height }"
  >
    <header :class="$style.header">
      <!-- @slot Статичная шапка панели -->
      <slot name="header"></slot>
    </header>
    <div :class="$style.content">
      <!-- @slot Прокручиваемый контент панели -->

      <slot name="default"></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
  type Props = {
    /**
     * Скролл панели вкл / выкл
     */
    disableScroll?: boolean;
    /**
     * Высота панели
     */
    height?: string;
  };

  const props = withDefaults(defineProps<Props>(), {
    disableScroll: false,
    height: '32rem',
  });
</script>

<style module lang="scss">
  .panel {
    display: flex;
    flex-direction: column;
    padding: 0.875rem;
    padding-bottom: 0.2rem;
    background: var(--gray-color-4);
    border: 1px solid var(--gray-color-1);
    border-radius: 0.3125rem;
  }

  .header {
    margin-bottom: 0.3125rem;
  }

  .content {
    padding-bottom: 0.875rem;
    overflow: auto;
  }
</style>
