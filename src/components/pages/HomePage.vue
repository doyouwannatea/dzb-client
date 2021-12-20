<template>
  <BasePageLayout>
    <header class="header">
      <h1 class="title page-title">Все проекты</h1>
      <p class="page-subtitle">
        На этой странице размещены проекты преподавателей и руководителей ИРНИТУ
      </p>
    </header>
    <aside class="top-filters">
      <ProjectListSearch />
      <ProjectListSort />
    </aside>
    <SidebarContainer>
      <template #sidebar>
        <ProjectListFilters />
      </template>
      <template #main>
        <div v-if="loading">loading...</div>
        <div v-if="error">{{ error }}</div>
        <div v-if="projectList && !projectList.length">ничего не найдено</div>
        <template v-if="!loading && !error && projectList">
          <ProjectList :project-list="projectList" />
          <ProjectListPagination
            :page-size="10"
            :pages-visible="7"
            :total-items="154"
          />
        </template>
      </template>
    </SidebarContainer>
  </BasePageLayout>
</template>

<script setup lang="ts">
  import BasePageLayout from '@/components/base/PageLayout.vue';
  import ProjectList from '@/components/ProjectList.vue';
  import ProjectListFilters from '@/components/ProjectListFilters.vue';
  import ProjectListSort from '@/components/ProjectListSort.vue';
  import ProjectListSearch from '@/components/ProjectListSearch.vue';
  import SidebarContainer from '@/components/SidebarContainer.vue';
  import ProjectListPagination from '@/components/ProjectListPagination.vue';
  import { useStore } from '@/store/store';
  import { ActionTypes } from '@/store/types/action-types';
  import { computed } from 'vue';
  const store = useStore();

  const error = computed(() => store.state.error);
  const loading = computed(() => store.state.loading);
  const projectList = computed(() => store.state.projectList);
  if (projectList.value === null) {
    store.dispatch(ActionTypes.GET_PROJECT_LIST, undefined);
  }
</script>

<style scoped>
  .top-filters {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 35px;
    margin-bottom: 18px;
  }

  .header {
    margin-top: 76px;
    margin-bottom: 45px;
  }

  .title {
    margin-bottom: 11px;
  }
</style>
