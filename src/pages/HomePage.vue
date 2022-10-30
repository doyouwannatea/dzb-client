<template>
  <ProjectListFilterModal v-if="isMobile" />
  <PageLayout>
    <header class="header">
      <h1 class="title page-title">Все проекты</h1>
      <p class="page-subtitle">
        На этой странице размещены проекты преподавателей и руководителей ИРНИТУ
      </p>
    </header>
    <aside class="header-controls">
      <ProjectSearch />
      <OpenProjectFilterModalButton v-if="isMobile" />
    </aside>
    <SidebarContainer>
      <template #sidebar>
        <ProjectListFilter />
      </template>
      <template #main>
        <ProjectList
          v-if="loading"
          :loading="loading"
          :loading-cards-length="PROJECTS_PER_PAGE"
        />
        <div v-if="error">{{ error }}</div>
        <ProjectSearchBadStub v-if="projectList && !projectList.length" />
        <template v-if="!loading && !error && projectList">
          <ProjectList :project-list="projectList" />
          <ProjectListPagination
            v-if="projectList && projectList.length"
            :page-size="PROJECTS_PER_PAGE"
            :pages-visible="
              isMobile ? PAGES_VISIBLE_MOBILE : PAGES_VISIBLE_DESKTOP
            "
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
  import {
    useHomePageSavedScrollPosition,
    useSaveHomePageScrollPosition,
  } from '@/hooks/useHomePageScrollPosition';
  // components
  import ProjectSearch from '@/components/project/ProjectSearch.vue';
  import ProjectSearchBadStub from '@/components/project/ProjectSearchBadStub.vue';
  import SidebarContainer from '@/components/layout/SidebarContainer.vue';
  import ProjectListFilter from '@/components/project/ProjectListFilter.vue';
  import ProjectList from '@/components/project/ProjectList.vue';
  import ProjectListPagination from '@/components/project/ProjectListPagination.vue';
  import PageLayout from '@/components/layout/PageLayout.vue';
  import OpenProjectFilterModalButton from '@/components/project/OpenProjectFilterModalButton.vue';
  import ProjectListFilterModal from '../components/project/ProjectListFilterModal.vue';
  import { useMobileS } from '@/helpers/breakpoints';

  useFilteredProjectList();
  useFetchAdditionalProjectData();
  useSaveHomePageScrollPosition();
  useHomePageSavedScrollPosition();

  const useProjectStore = useProjectsStore();
  const error = computed(() => useProjectStore.error);
  const loading = computed(() => useProjectStore.loading);
  const projectList = computed(() => useProjectStore.projectList);
  const projectCount = computed(() => useProjectStore.projectCount);
  const isMobile = useMobileS();

  const PROJECTS_PER_PAGE = 7;
  const PAGES_VISIBLE_DESKTOP = 7;
  const PAGES_VISIBLE_MOBILE = 4;
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints.scss';

  .header-controls {
    display: flex;
    gap: 2.1875rem;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.125rem;
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
