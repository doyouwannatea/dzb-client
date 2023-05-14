<template>
  <div
    class="container"
    :style="{ maxWidth: `calc(${maxWidth}px + var(--side-padding) * 2)` }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  type Props = { size: 'lg' | 'md' };

  const props = defineProps<Props>();
  const maxWidth = computed(() => {
    switch (props.size) {
      case 'lg':
        return 1800;
      case 'md':
      default:
        return 1400;
    }
  });
</script>

<style scoped>
  .container {
    --side-padding: 1rem;

    width: 100%;
    padding-right: var(--side-padding);
    padding-left: var(--side-padding);
    margin-right: auto;
    margin-left: auto;
  }
</style>
