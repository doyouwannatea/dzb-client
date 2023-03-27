<template>
  <component :is="props.is" :class="$style['list-group-label']">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
  type Props = {
    is?: string;
  };

  const props = withDefaults(defineProps<Props>(), { is: 'span' });
</script>

<style module lang="scss">
  .list-group-label {
    margin-bottom: 0.1875rem;
    font-size: 0.75rem;
    color: var(--gray-color-2);
    text-transform: uppercase;
  }
</style>
