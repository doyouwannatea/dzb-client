<template>
  <section>
    <LoadingParticipationsList v-if="isFetching" />
    <BaseStub
      v-else-if="isError"
      title="Ошибка загрузки списка заявок"
      :subtitle="String(error)"
    />
    <BaseStub
      v-else-if="projectProposalList?.length === 0"
      title="Заявки на проекты не найдены :("
      subtitle="У вас пока нет ни одной заявки на проект"
    />
    <template v-else>
      <SupervisorProjectProposalCard
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
  import SupervisorProjectProposalCard from '@/components/project-proposal/SupervisorProjectProposalCard.vue';
  import BasePagination from '@/components/ui/BasePagination.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import { useGetProjectProposalListQuery } from '@/api/SupervisorApi/hooks/useGetProjectProposalListQuery';
  import { usePaginatedList } from '@/hooks/usePaginatedList';
  import LoadingParticipationsList from './LoadingParticipationsList.vue';

  const router = useRouter();
  const route = useRoute();

  const {
    isFetching,
    isError,
    error,
    data: projectProposalList,
  } = useGetProjectProposalListQuery({
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
