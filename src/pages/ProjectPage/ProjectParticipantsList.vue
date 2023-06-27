<template>
  <BaseTable
    v-if="
      projectData && sortedParticipants.length > 0 && !isFetching && !isError
    "
    class="table"
    :headers="['№', 'ФИО', 'Группа']"
    :rows="tableRows"
  />

  <BasePanel v-else>
    <BaseStub
      title="Нет участников :("
      subtitle="Пока на этом проекте нет участников, возможно, мы ещё не успели обновить данные."
    />
  </BasePanel>
</template>

<script setup lang="ts">
  import { computed, watchEffect } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import BaseTable, { RowData } from '@/components/ui/BaseTable.vue';
  import { useGetSingleProjectQuery } from '@/api/ProjectApi/hooks/useGetSingleProjectQuery';
  import { canViewParticipants } from '@/helpers/project';
  import { compareString } from '@/helpers/string';
  import { toProjectRoute } from '@/router/utils/routes';
  import { Candidate } from '@/models/Candidate';

  const router = useRouter();

  const route = useRoute();
  const projectId = computed(() => Number(route.params.id));
  const {
    isFetching,
    isError,
    data: projectData,
  } = useGetSingleProjectQuery(projectId);

  watchEffect(() => {
    const stateId = projectData.value?.project?.state.id;
    const projectId = projectData.value?.project?.id;
    if (projectId && stateId && !canViewParticipants(stateId)) {
      router.replace(toProjectRoute(projectId));
    }
  });

  const sortedParticipants = computed<Candidate[]>(() => {
    if (!projectData.value) return [];
    const participants = projectData.value.project.participants || [];
    return [...participants].sort((a, b) =>
      compareString(a.fio.toLowerCase(), b.fio.toLowerCase()),
    );
  });

  const tableRows = computed<RowData[]>(() =>
    sortedParticipants.value.map(({ fio, training_group, id }, index) => ({
      key: String(id),
      data: [index + 1, fio, training_group],
    })),
  );
</script>

<style lang="scss" scoped>
  .table {
    &:deep(tr:not(:first-child)) {
      color: var(--text-color);
      background-color: #eef9f2;
    }

    &:deep(td:nth-child(1)) {
      width: 6%;
    }

    &:deep(td:nth-child(2)) {
      font-weight: 800;
    }
  }
</style>
