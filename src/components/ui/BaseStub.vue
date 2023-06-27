<template>
  <section class="panel">
    <!-- @slot Заголовок -->
    <slot name="title">
      <h1 v-if="title" class="title">{{ title }}</h1>
    </slot>
    <!-- @slot Подзаголовок -->
    <slot name="subtitle">
      <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
    </slot>
    <!-- @slot Слот в нижней части компонента для контролов -->
    <slot name="button"></slot>
  </section>
</template>

<script setup lang="ts">
  type Props = {
    /**
     * Заголовок
     */
    title?: string;
    /**
     * Подзаголовок
     */
    subtitle?: string;
  };
  defineProps<Props>();
</script>

<style scoped>
  .panel {
    color: var(--gray-color-2);
    text-align: center;
  }

  .title {
    margin-bottom: 1rem;
    font-size: 1.75rem;
    line-height: 2.25rem;
  }

  .subtitle {
    max-width: 28.125rem;
    margin-right: auto;
    margin-bottom: 2.125rem;
    margin-left: auto;
    font-size: 1.125rem;
    line-height: 150%;
  }
</style>
