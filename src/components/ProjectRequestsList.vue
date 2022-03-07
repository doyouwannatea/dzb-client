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
    <section>
      <h1 class="empty-title">Ни одной заявки :(</h1>
      <p class="empty-subtitle">
        Пока на этот проект ещё не подали ни одной заявки, так что ты можешь
        стать первым!
      </p>
      <BaseButton case="uppercase" :disabled="loading" class="request-btn">
        подать заявку
      </BaseButton>
    </section>
  </BasePanel>
</template>

<script setup lang="ts">
  import BasePanel from './base/BasePanel.vue';
  import BaseButton from './base/BaseButton.vue';
  import { useProjectsStore } from '@/stores/projects';
  import { storeToRefs } from 'pinia';

  const {
    openedProject: project,
    loading,
    error,
  } = storeToRefs(useProjectsStore());
</script>

<style scoped>
  .empty-list-panel {
    text-align: center;
    color: var(--gray-color-2);
  }

  .empty-title {
    font-size: 1.75rem;
    line-height: 2.25rem;
  }

  .empty-subtitle {
    font-size: 1.125rem;
    line-height: 150%;
    margin-top: 1rem;
    max-width: 28.125rem;
    margin-left: auto;
    margin-right: auto;
  }

  .request-btn {
    margin-top: 2.125rem;
    margin-left: auto;
    margin-right: auto;
  }

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
