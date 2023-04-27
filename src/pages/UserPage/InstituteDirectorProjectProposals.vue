<template>
  <section>
    <LoadingParticipationsList v-if="isFetching" />
    <BaseStub
      v-else-if="isError"
      title="Ошибка загрузки списка заявок"
      :subtitle="String(error)"
    />
    <BaseStub
      v-if="projectProposalList?.length === 0"
      title="Заявки на проекты не найдены :("
      subtitle="На данный момент Вам не отправили ни одной заявки на проект"
    />
    <template v-else>
      <InstituteDirectorProjectProposalCard
        v-for="projectProposal in paginatedProposals"
        :key="projectProposal.id"
        :project-proposal="projectProposal"
      />
      <BasePagination
        :page="currentPage"
        :total-items="projectProposalList?.length || 0"
        :page-size="PAGE_SIZE"
        :pages-visible="PAGES_VISIBLE"
        @update:page="onPageChange"
      />
    </template>
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useRouter } from 'vue-router';
  import ProjectProposal from '../../components/project-proposal/ProjectProposal.vue';
  import { useProjectProposalList } from '@/queries/useProjectProposalList';
  import LoadingParticipationsList from './LoadingParticipationsList.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import BasePagination from '@/components/ui/BasePagination.vue';
  import { usePaginatedList } from '@/hooks/usePaginatedList';
  import InstituteDirectorProjectProposalCard from '@/components/project-proposal/InstituteDirectorProjectProposalCard.vue';

  const router = useRouter();
  const route = useRoute();

  const {
    isFetching,
    isFetched,
    isError,
    error,
    data: projectProposalList,
  } = useProjectProposalList({
    select: (list) => list.sort((a, b) => b.state.id - a.state.id),
  });

  const PAGE_SIZE = 5;
  const PAGES_VISIBLE = 7;
  const currentPage = computed(() => Number(route.params.page) || 1);
  const paginatedProposals = usePaginatedList(projectProposalList, {
    pageSize: PAGE_SIZE,
    currentPage: currentPage,
  });

  function onPageChange(page: number) {
    router.push({ ...route, params: { page } });
  }
</script>
