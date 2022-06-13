<template>
  <PageLayout>
    <header class="header">
      <h1 class="title page-title">Все проекты</h1>
      <p class="page-subtitle">
        На этой странице размещены проекты преподавателей и руководителей ИРНИТУ
      </p>
    </header>
    <aside class="top-filters">
      <ProjectSearch />
      <ProjectListSort />
    </aside>
    <SidebarContainer>
      <template #sidebar>
        <ProjectListFilter />
      </template>
      <template #main>
        <div v-if="loading">loading...</div>
        <div v-if="error">{{ error }}</div>
        <div v-if="projectList && !projectList.length">ничего не найдено</div>
        <template v-if="!loading && !error && projectList">
          <ProjectList :project-list="projectList" />
          <ProjectListPagination
            v-if="projectList && projectList.length"
            :page-size="7"
            :pages-visible="7"
            :total-items="projectCount"
          />
        </template>
      </template>
    </SidebarContainer>
  </PageLayout>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  import { useFilteredProjectList } from '@/hooks/useProjectFilters';
  import { useFetchAdditionalProjectData } from '@/hooks/useFetchAdditionalProjectData';
  // components
  import ProjectSearch from '@/components/project/ProjectSearch.vue';
  import ProjectListSort from '@/components/project/ProjectListSort.vue';
  import SidebarContainer from '@/components/layout/SidebarContainer.vue';
  import ProjectListFilter from '@/components/project/ProjectListFilter.vue';
  import ProjectList from '@/components/project/ProjectList.vue';
  import ProjectListPagination from '@/components/project/ProjectListPagination.vue';
  import PageLayout from '@/components/layout/PageLayout.vue';

  useFilteredProjectList();
  useFetchAdditionalProjectData();
  const store = useProjectsStore();

  const error = computed(() => store.error);
  const loading = computed(() => store.loading);
  const projectList = computed(() => store.projectList);
  const projectCount = computed(() => store.projectCount);
</script>

<style scoped>
  .top-filters {
    display: flex;
    gap: 2.1875rem;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.125rem;
  }

  .header {
    margin-top: 4.75rem;
    margin-bottom: 2.8125rem;
  }

  .title {
    margin-bottom: 0.6875rem;
  }
</style>
