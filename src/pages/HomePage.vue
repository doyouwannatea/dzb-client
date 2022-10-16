<template>
  <ProjectListFilterModal class="project-filter-modal" />
  <PageLayout>
    <header class="header">
      <h1 class="title page-title">Все проекты</h1>
      <p class="page-subtitle">
        На этой странице размещены проекты преподавателей и руководителей ИРНИТУ
      </p>
    </header>
    <aside class="top-filters">
      <ProjectSearch />
      <OpenProjectFilterModalButton class="open-project-filter-btn" />
    </aside>
    <SidebarContainer class="sidebar-container">
      <template #sidebar>
        <ProjectListFilter />
      </template>
      <template #main>
        <div v-if="loading">загрузка...</div>
        <div v-if="error">{{ error }}</div>
        <div v-if="projectList && !projectList.length">
          Проекты не найдены 😥
        </div>
        <template v-if="!loading && !error && projectList">
          <ProjectList :project-list="projectList" />
          <template v-if="projectList && projectList.length">
            <ProjectListPagination
              class="desktop-pagination"
              :page-size="7"
              :pages-visible="7"
              :total-items="projectCount"
            />
            <ProjectListPagination
              class="mobile-pagination"
              :page-size="7"
              :pages-visible="4"
              :total-items="projectCount"
            />
          </template>
        </template>
      </template>
    </SidebarContainer>
  </PageLayout>
</template>

<script setup lang="ts">
  import { computed, watch } from 'vue';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  import { useFilteredProjectList } from '@/hooks/useProjectFilters';
  import { useFetchAdditionalProjectData } from '@/hooks/useFetchAdditionalProjectData';
  import {
    useHomePageSavedScrollPosition,
    useSaveHomePageScrollPosition,
  } from '@/hooks/useHomePageScrollPosition';
  // components
  import ProjectSearch from '@/components/project/ProjectSearch.vue';
  import SidebarContainer from '@/components/layout/SidebarContainer.vue';
  import ProjectListFilter from '@/components/project/ProjectListFilter.vue';
  import ProjectList from '@/components/project/ProjectList.vue';
  import ProjectListPagination from '@/components/project/ProjectListPagination.vue';
  import PageLayout from '@/components/layout/PageLayout.vue';
  import OpenProjectFilterModalButton from '@/components/project/OpenProjectFilterModalButton.vue';
  import ProjectListFilterModal from '../components/project/ProjectListFilterModal.vue';

  useFilteredProjectList();
  useFetchAdditionalProjectData();
  useSaveHomePageScrollPosition();
  useHomePageSavedScrollPosition();

  const useProjectStore = useProjectsStore();
  const error = computed(() => useProjectStore.error);
  const loading = computed(() => useProjectStore.loading);
  const projectList = computed(() => useProjectStore.projectList);
  const projectCount = computed(() => useProjectStore.projectCount);
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints.scss';

  .open-project-filter-btn,
  .project-filter-modal {
    display: none;

    @media (max-width: $mobile-s) {
      display: flex;
    }
  }

  .top-filters {
    display: flex;
    gap: 2.1875rem;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.125rem;
  }

  .sidebar-container {
    @media (max-width: $mobile-s) {
      grid-template-columns: auto !important;

      & > :deep(.aside) {
        display: none;
      }
    }
  }

  .desktop-pagination {
    @media (max-width: $mobile-s) {
      display: none;
    }
  }

  .mobile-pagination {
    display: none;

    @media (max-width: $mobile-s) {
      display: block;
    }
  }

  .header {
    margin-top: 4.75rem;
    margin-bottom: 2.8125rem;

    @media (max-width: $mobile-s) {
      margin-top: 1.875rem;
    }
  }

  .title {
    margin-bottom: 0.6875rem;
  }
</style>
