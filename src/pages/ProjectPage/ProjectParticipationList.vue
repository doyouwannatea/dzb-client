<template>
  <BaseTable
    v-if="project && clearedParticipations.length > 0 && !loading && !error"
    class="table"
    :headers="['№', 'ФИО', 'Группа', 'Приоритетность', 'Время подачи заявки']"
    :rows="tableRows"
  >
    <template #row="{ row, index, key }">
      <tr
        :key="key || index"
        :class="{ accepted: index + 1 <= project.places }"
      >
        <td v-for="(column, columnIndex) in row" :key="columnIndex">
          {{ column }}
        </td>
      </tr>
    </template>
  </BaseTable>

  <BasePanel v-else>
    <ProjectParticipationListStub />
  </BasePanel>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { DateTime } from 'luxon';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  import { Participation } from '@/models/Participation';
  // components
  import BasePanel from '@/components/ui/BasePanel.vue';
  import ProjectParticipationListStub from './ProjectParticipationListStub.vue';
  import BaseTable, { RowData } from '@/components/ui/BaseTable.vue';

  const projectsStore = useProjectsStore();
  const { openedProject: project, loading, error } = storeToRefs(projectsStore);

  function formatParticipationApplicationTime(time: string) {
    const dt = DateTime.fromISO(time, { locale: 'ru-RU' });
    return dt.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
  }

  function sortParticipations(participations: Participation[]) {
    return [...participations].sort(
      (a, b) =>
        new Date(a.updated_at).getTime() * a.priority -
        new Date(b.updated_at).getTime() * b.priority,
    );
  }

  const clearedParticipations = computed<Participation[]>(() => {
    let participations = project?.value?.participations;
    if (!participations) return [];
    // сортировка по приоритету
    return sortParticipations(participations);
  });

  const tableRows = computed<RowData[]>(() =>
    clearedParticipations.value.map(
      ({ candidate, priority, updated_at, id }, index) => ({
        key: String(id),
        data: [
          index + 1,
          candidate.fio,
          candidate.training_group,
          priority,
          formatParticipationApplicationTime(updated_at),
        ],
      }),
    ),
  );
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  td:nth-child(1) {
    width: 6%;
  }

  .table:deep(th:nth-child(4)) {
    @media (max-width: $mobile-s) {
      min-width: 5.3em;
      word-break: break-word;
    }
  }

  .accepted {
    color: var(--text-color);
    background-color: #eef9f2;
  }

  .accepted > td:nth-child(2) {
    font-weight: 800;
  }
</style>
