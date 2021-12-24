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
  import BasePageLayout from '@/components/base/PageLayout.vue';
  import ProjectList from '@/components/ProjectList.vue';
  import ProjectListFilter from '@/components/ProjectListFilter.vue';
  import ProjectListSort from '@/components/ProjectListSort.vue';
  import ProjectSearch from '@/components/ProjectSearch.vue';
  import SidebarContainer from '@/components/SidebarContainer.vue';
  import ProjectListPagination from '@/components/ProjectListPagination.vue';
  import { useStore } from '@/store/store';
  import { useUpdateProjectList } from '@/hooks/useUpdateProjectList';
  const store = useStore();

  const error = computed(() => store.state.error);
  const loading = computed(() => store.state.loading);
  const projectList = computed(() => store.state.projectList);
  const projectCount = computed(() => store.state.projectCount);

  useUpdateProjectList();
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
