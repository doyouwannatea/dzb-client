<template>
  <BasePageLayout>
    <header class="header">
      <h1 class="title page-title">Все проекты</h1>
      <p class="page-subtitle">
        На этой странице размещены проекты преподавателей и руководителей ИРНИТУ
      </p>
    </header>
    <aside class="top-filters">
      <ProjectListSearch></ProjectListSearch>
      <ProjectListSort></ProjectListSort>
    </aside>
    <SidebarContainer>
      <template #sidebar>
        <ProjectListFilters></ProjectListFilters>
      </template>
      <template #main>
        <ProjectList :project-list="projectList"></ProjectList>
      </template>
    </SidebarContainer>
  </BasePageLayout>
</template>

<script setup lang="ts">
  import BasePageLayout from '@/layout/BasePageLayout.vue';
  import ProjectList from '@/components/ProjectList.vue';
  import ProjectListFilters from '@/controls/ProjectListFilters.vue';
  import ProjectListSort from '@/controls/ProjectListSort.vue';
  import ProjectListSearch from '@/controls/ProjectListSearch.vue';
  import SidebarContainer from '@/layout/SidebarContainer.vue';
  import { onBeforeMount, ref } from 'vue';
  import ProjectApi from '@/api/ProjectApi';
  import type { Project } from '@/models/Project';

  const projectList = ref<Project[]>([]);

  onBeforeMount(() => {
    ProjectApi.getProjectList(1).then((list) => (projectList.value = list));
  });
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
