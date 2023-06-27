<template>
  <BaseBadge :class="['status', stateClass]">
    {{ props.useAcronyms ? stateAcronyms : state.state }}
  </BaseBadge>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import {
    ProjectState,
    StateAcronyms,
    StateClass,
  } from '@/models/ProjectState';
  import BaseBadge from '../ui/BaseBadge.vue';

  type Props = { state: ProjectState; useAcronyms?: boolean };
  const props = withDefaults(defineProps<Props>(), { useAcronyms: false });

  const stateClass = computed(() => StateClass[props.state.id]);
  const stateAcronyms = computed(
    () => StateAcronyms[props.state.id] || props.state.state,
  );
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

  .status.processing {
    --text-color: var(--accent-color-3);
    --border-color: var(--accent-color-3);
  }
</style>
