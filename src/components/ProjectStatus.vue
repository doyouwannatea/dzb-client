<template>
  <BaseBadge :class="['status', stateClass]">{{ state }}</BaseBadge>
</template>

<script setup lang="ts">
  import { StateName } from '@/models/Project';
  import { StateClass } from '@/models/values/project-state-class';
  import BaseBadge from './base/BaseBadge.vue';

  type Props = { state: StateName };
  const props = defineProps<Props>();

  const stateClass = StateClass[props.state];
</script>

<style scoped>
  .status {
    --status-color: var(--accent-color-1);
    border-color: var(--status-color);
    color: var(--status-color);
  }

  .status.active {
    --status-color: var(--green-color-1);
  }

  .status.extra {
    --status-color: var(--accent-color-2);
  }

  .status.archived {
    --status-color: var(--gray-color-2);
  }
</style>
