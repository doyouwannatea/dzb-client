<template>
  <BasePageLayout>
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
  </BasePageLayout>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import BasePageLayout from '@/components/unique/PageLayout.vue';
  import ProjectList from '@/components/ProjectList.vue';
  import ProjectListFilter from '@/components/ProjectListFilter.vue';
  import ProjectListSort from '@/components/ProjectListSort.vue';
  import ProjectSearch from '@/components/ProjectSearch.vue';
  import SidebarContainer from '@/components/SidebarContainer.vue';
  import ProjectListPagination from '@/components/ProjectListPagination.vue';
  import { useUpdateProjectList } from '@/hooks/useUpdateProjectList';
  import { useProjectsStore } from '@/stores/projects';

  const store = useProjectsStore();

  const error = computed(() => store.error);
  const loading = computed(() => store.loading);
  const projectList = computed(() => store.projectList);
  const projectCount = computed(() => store.projectCount);

  useUpdateProjectList();
</script>

<style scoped>
  .top-filters {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2.1875rem;
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
