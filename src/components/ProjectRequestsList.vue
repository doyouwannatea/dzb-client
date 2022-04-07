<template>
  <BasePanel v-if="project && !loading && !error" :cols="1" class="list-panel">
    <table>
      <tr>
        <th>№</th>
        <th>ФИО</th>
        <th>Группа</th>
        <th>Приоритетность</th>
      </tr>
      <tr class="accepted">
        <td>1</td>
        <td>Иван Иванович Иванов</td>
        <td>ИСТб-20-1</td>
        <td>1</td>
      </tr>
      <tr class="accepted">
        <td>2</td>
        <td>Иван Иванович Иванов</td>
        <td>ИСТб-20-1</td>
        <td>1</td>
      </tr>
      <tr class="accepted">
        <td>3</td>
        <td>Иван Иванович Иванов</td>
        <td>ИСТб-20-1</td>
        <td>1</td>
      </tr>
      <tr>
        <td>4</td>
        <td>Иван Иванович Иванов</td>
        <td>ИСТб-20-1</td>
        <td>2</td>
      </tr>
      <tr>
        <td>5</td>
        <td>Иван Иванович Иванов</td>
        <td>ИСТб-20-1</td>
        <td>2</td>
      </tr>
    </table>
  </BasePanel>
  <BasePanel v-else :cols="1" class="empty-list-panel">
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
  .list-panel {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
  }

  .accepted {
    background-color: #eef9f2;
    color: var(--text-color);
  }

  .accepted > td:nth-child(2) {
    font-weight: 800;
  }

  table {
    border-collapse: collapse;
    text-align: left;
    font-size: 1.25rem;
    color: #737373;
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

  tr:last-child > td {
    border-bottom: none;
  }

  th:first-child,
  td:first-child {
    text-align: center;
    padding-right: 0.625rem;
    padding-left: 0.625rem;
  }
</style>
