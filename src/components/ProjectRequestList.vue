<template>
  <BasePanel v-if="project && !loading && !error" class="list-panel">
    <table>
      <tr>
        <th>№</th>
        <th>ФИО</th>
        <th>Группа</th>
        <th>Приоритетность</th>
      </tr>
      <tr class="accepted">
        <td>1</td>
        <td>Булгатов Александ</td>
        <td>ИСТб-19-1</td>
        <td>1</td>
      </tr>
      <tr class="accepted">
        <td>2</td>
        <td>Колосов Вячеслав</td>
        <td>ИСТб-19-1</td>
        <td>1</td>
      </tr>
      <tr class="accepted">
        <td>3</td>
        <td>Никульшеев Александ</td>
        <td>АСУб-19-1</td>
        <td>1</td>
      </tr>
      <tr class="accepted">
        <td>4</td>
        <td>Карбушев Иван</td>
        <td>ИСТб-19-2</td>
        <td>2</td>
      </tr>
      <tr>
        <td>5</td>
        <td>Барбаш Елизавета</td>
        <td>ИСТб-19-1</td>
        <td>2</td>
      </tr>
    </table>
  </BasePanel>
  <BasePanel v-else>
    <ProjectRequestsStub />
  </BasePanel>
</template>

<script setup lang="ts">
  import BasePanel from './base/BasePanel.vue';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  import { storeToRefs } from 'pinia';
  import ProjectRequestsStub from './ProjectRequestsStub.vue';

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
