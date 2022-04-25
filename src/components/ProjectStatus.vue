<template>
  <BaseBadge :class="['status', stateClass]">{{ state.state }}</BaseBadge>
</template>

<script setup lang="ts">
  import { State, StateClass } from '@/models/ProjectState';
  import BaseBadge from './base/BaseBadge.vue';

  type Props = { state: State };
  const props = defineProps<Props>();

  const stateClass = StateClass[props.state.id];
</script>

<style scoped>
  .status {
    --text-color: var(--accent-color-1);
    --border-color: var(--accent-color-1);
  }

  .status.active {
    --text-color: var(--green-color-1);
    --border-color: var(--green-color-1);
  }

  .status.extra {
    --text-color: var(--accent-color-2);
    --border-color: var(--accent-color-2);
  }

  .status.archived {
    --text-color: var(--gray-color-2);
    --border-color: var(--gray-color-2);
  }
</style>
