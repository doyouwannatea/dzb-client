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
        <ProjectList v-if="!loading && !error" :project-list="projectList" />
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
  import { onBeforeMount, ref } from 'vue';
  import ProjectApi from '@/api/ProjectApi';
  import type { Project } from '@/models/Project';

  const loading = ref(false);
  const error = ref('');
  const projectList = ref<Project[]>([]);

  onBeforeMount(async () => {
    loading.value = true;
    error.value = '';
    try {
      const list = await ProjectApi.getProjectList(1);
      projectList.value = list;
    } catch (projectApiError) {
      error.value = String(projectApiError);
    } finally {
      loading.value = false;
    }
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
