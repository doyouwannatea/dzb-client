<template>
  <BaseBadge :class="['status', stateClass]">
    {{ props.state.state }}
  </BaseBadge>
</template>

<script setup lang="ts">
  import { ProjectProposalState, StateClass } from '@/models/ProjectProposal';
  // components
  import BaseBadge from '../ui/BaseBadge.vue';

  type Props = { state: ProjectProposalState };
  const props = defineProps<Props>();

  // TODO: стоит добавить в props BaseBadge массив с состояниями и привязкой к цветам, тогда не надо будет создавать несколько компонентов с одниковой логикой
  const stateClass = StateClass[props.state.id];
</script>

<style scoped>
  .status {
    --text-color: var(--accent-color-1);
    --border-color: var(--accent-color-1);
  }

  .status.review {
    --text-color: var(--accent-color-3);
    --border-color: var(--accent-color-3);
  }

  .status.draft {
    --text-color: var(--accent-color-2);
    --border-color: var(--accent-color-2);
  }

  .status.rejected {
    --text-color: var(--red-color-1);
    --border-color: var(--red-color-1);
  }

  .status.approved {
    --text-color: var(--accent-color-3);
    --border-color: var(--accent-color-3);
  }
</style>
