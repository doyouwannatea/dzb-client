<template>
  <BaseTable
    v-if="project && sortedParticipants.length > 0 && !loading && !error"
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
  import { computed, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  import { compareString } from '@/helpers/string';
  import { Candidate } from '@/models/Candidate';
  import { StateID } from '@/models/ProjectState';
  import { RouteNames } from '@/router/types/route-names';
  // components
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseTable, { RowData } from '@/components/ui/BaseTable.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';

  const router = useRouter();
  const projectsStore = useProjectsStore();
  const { openedProject: project, loading, error } = storeToRefs(projectsStore);

  watch(
    () => project?.value?.state.id,
    (stateId) => {
      if (!stateId) return;
      if (stateId === StateID.RecruitingState) {
        router.replace({
          name: RouteNames.PROJECT_DETAILS,
          params: { id: router.currentRoute.value.params.id },
        });
      }
    },
    { immediate: true },
  );

  const sortedParticipants = computed<Candidate[]>(() => {
    if (!project?.value) return [];
    const participants = project.value.participants;
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
