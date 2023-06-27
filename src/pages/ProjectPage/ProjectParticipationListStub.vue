<template>
  <BaseStub :title="title" :subtitle="subtitle">
    <template #button>
      <OpenParticipationModalButton
        v-if="props.project"
        :project="props.project"
        variant="primary"
      />
    </template>
  </BaseStub>
</template>

<script setup lang="ts">
  import OpenParticipationModalButton from '@/components/participation/OpenParticipationModalButton.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import { Project } from '@/models/Project';

  type Props = {
    project?: Project;
  };

  const props = defineProps<Props>();

  const title = 'Ни одной заявки :(';
  const subtitle =
    'Пока на этот проект ещё не подали ни одной заявки, так что ты можешь стать первым!';
</script>
