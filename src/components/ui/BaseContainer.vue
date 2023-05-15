<template>
  <div
    class="container"
    :style="{ maxWidth: `calc(${size}px + var(--side-padding) * 2)` }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { toRefs } from '@vueuse/core';
  import { ContainerSize } from '@/models/BaseContainer';

  type Props = { size?: ContainerSize };

  const props = withDefaults(defineProps<Props>(), { size: ContainerSize.lg });
  const { size } = toRefs(props);
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
