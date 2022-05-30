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
        v-for="(participation, idx) in project.participations"
        :key="participation.id"
        :class="{ accepted: idx + 1 <= project.places }"
      >
        <td>{{ idx + 1 }}</td>
        <td>{{ participation.candidate.fio }}</td>
        <td>{{ participation.candidate.training_group }}</td>
        <td>{{ participation.priority }}</td>
        <td>{{ toJSONLocal(new Date(participation.created_at)) }}</td>
      </tr>
    </table>
  </BasePanel>
  <BasePanel v-else>
    <ProjectParticipationListStub />
  </BasePanel>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { toJSONLocal } from '@/helpers/string';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  // components
  import BasePanel from '@/components/ui/BasePanel.vue';
  import ProjectParticipationListStub from './ProjectParticipationListStub.vue';

  // TODO: отсортировать по времени и приоритету
  // TODO: добавить время подачи заявки до минут
  // TODO: после отправки заявки повторно запрашивать проект

  const {
    openedProject: project,
    loading,
    error,
  } = storeToRefs(useProjectsStore());
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
