<template>
  <BasePanel
    v-if="project?.participations.length && !loading && !error"
    class="list-panel"
  >
    <table>
      <tr>
        <th>№</th>
        <th>ФИО</th>
        <th>Группа</th>
        <th>Приоритетность</th>
        <th>Время подачи заявки</th>
      </tr>
      <tr
        v-for="(participation, idx) in sortedParticipations"
        :key="participation.id"
        :class="{ accepted: idx + 1 <= project.places }"
      >
        <td>{{ idx + 1 }}</td>
        <td>{{ participation.candidate.fio }}</td>
        <td>{{ participation.candidate.training_group }}</td>
        <td>{{ participation.priority }}</td>
        <td>
          {{ formatParticipationApplicationTime(participation.created_at) }}
        </td>
      </tr>
    </table>
  </BasePanel>
  <BasePanel v-else>
    <ProjectParticipationListStub />
  </BasePanel>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { DateTime } from 'luxon';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  // components
  import BasePanel from '@/components/ui/BasePanel.vue';
  import ProjectParticipationListStub from './ProjectParticipationListStub.vue';
  import { computed } from 'vue';
  import { Participation } from '@/models/Participation';

  const {
    openedProject: project,
    loading,
    error,
  } = storeToRefs(useProjectsStore());

  function formatParticipationApplicationTime(time: string) {
    const dt = DateTime.fromISO(time, { locale: 'ru-RU' });
    return dt.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
  }

  function sortParticipations(participations: Participation[]) {
    return [...participations].sort(
      (a, b) =>
        new Date(a.created_at).getTime() * a.priority -
        new Date(b.created_at).getTime() * b.priority,
    );
  }

  const sortedParticipations = computed<Participation[] | undefined>(() => {
    const participations = project?.value?.participations;
    if (!participations) return undefined;
    return sortParticipations(participations);
  });
</script>

<style scoped>
  table {
    width: 100%;
    font-size: 1.25rem;
    color: #737373;
    text-align: left;
    border-collapse: collapse;
  }

  th {
    font-weight: 800;
    color: var(--text-color);
  }

  td,
  th {
    padding-top: 1.4375rem;
    padding-bottom: 1.4375rem;
    border-bottom: 1px solid #e5f1ea;
  }

  th:first-child,
  td:first-child {
    padding-right: 0.625rem;
    padding-left: 0.625rem;
    text-align: center;
  }

  tr:last-child > td {
    border-bottom: none;
  }

  .list-panel {
    padding-top: 0;
    padding-right: 0;
    padding-left: 0;
  }

  .accepted {
    color: var(--text-color);
    background-color: #eef9f2;
  }

  .accepted > td:nth-child(2) {
    font-weight: 800;
  }
</style>
