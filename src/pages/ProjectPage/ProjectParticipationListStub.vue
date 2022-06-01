<template>
  <BaseStub :title="title" :subtitle="subtitle">
    <template #button>
      <OpenParticipationModalButton
        v-if="projectsStore.openedProject"
        :project="projectsStore.openedProject"
        variant="primary"
      />
    </template>
  </BaseStub>
</template>

<script setup lang="ts">
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  // components
  import BaseStub from '@/components/ui/BaseStub.vue';
  import OpenParticipationModalButton from '@/components/participation/OpenParticipationModalButton.vue';

  const projectsStore = useProjectsStore();

  const title = 'Ни одной заявки :(';
  const subtitle =
    'Пока на этот проект ещё не подали ни одной заявки, так что ты можешь стать первым!';
</script>
