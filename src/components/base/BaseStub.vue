<template>
  <section class="panel">
    <slot name="title">
      <h1 v-if="title" class="title">{{ title }}</h1>
    </slot>
    <slot name="subtitle">
      <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
    </slot>
    <slot name="button"></slot>
  </section>
</template>

<script setup lang="ts">
  type Props = {
    title?: string;
    subtitle?: string;
  };
  defineProps<Props>();
</script>

<style scoped>
  .panel {
    text-align: center;
    color: var(--gray-color-2);
  }

  .title {
    font-size: 1.75rem;
    line-height: 2.25rem;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 1.125rem;
    line-height: 150%;
    max-width: 28.125rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2.125rem;
  }
</style>
