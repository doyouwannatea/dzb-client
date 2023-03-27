<template>
  <section>
    <BaseStub
      v-if="!isError && isFetched && onlyProposals.length === 0"
      title="Заявки на проекты не найдены :("
      subtitle="У вас пока нет ни одной заявки на проект"
    />
    <LoadingParticipationsList v-if="isFetching" />
    <BaseStub
      v-else-if="isError"
      title="Ошибка загрузки списка заявок"
      :subtitle="String(error)"
    />
    <ProjectProposal
      v-for="projectProposal in onlyProposals"
      v-else
      :key="projectProposal.id"
      :project-proposal="projectProposal"
    />
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import ProjectProposal from '../../components/project-proposal/ProjectProposal.vue';
  import { PROJECT_PROPOSAL_IDS } from '@/models/ProjectProposal';
  import { useProjectProposalList } from '@/queries/useProjectProposalList';
  import LoadingParticipationsList from './LoadingParticipationsList.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';

  const {
    isFetching,
    isFetched,
    isError,
    error,
    data: projectProposalList,
  } = useProjectProposalList();

  const onlyProposals = computed(
    () =>
      projectProposalList.value?.filter((projectProposal) =>
        PROJECT_PROPOSAL_IDS.includes(projectProposal.state.id),
      ) || [],
  );
</script>
