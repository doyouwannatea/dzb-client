<template>
  <ProjectListFilterModal v-if="isSmallDevice" />
  <PageLayout>
    <header class="header">
      <h1 class="title page-title">Все проекты</h1>
      <p class="page-subtitle">
        На этой странице размещены проекты преподавателей и руководителей ИРНИТУ
      </p>
    </header>
    <aside class="header-controls">
      <ProjectSearch />
      <OpenProjectFilterModalButton v-if="isSmallDevice" />
    </aside>
    <SidebarContainer>
      <template #sidebar>
        <ProjectListFilter />
      </template>
      <template #main>
        <div v-if="projectListQuery.isError.value">
          {{ projectListQuery.error.value }}
        </div>
        <ProjectList
          v-else-if="projectListQuery.isFetching.value"
          loading
          :loading-cards-length="PROJECTS_PER_PAGE"
        />
        <ProjectSearchBadStub
          v-else-if="projectListQuery.data.value?.data.length === 0"
        />
        <template v-else>
          <ProjectList :project-list="projectListQuery.data.value?.data" />
          <BasePagination
            :page-size="PROJECTS_PER_PAGE"
            :pages-visible="
              isSmallDevice ? PAGES_VISIBLE_MOBILE : PAGES_VISIBLE_DESKTOP
            "
            :total-items="projectListQuery.data.value?.projectCount || 0"
            :page="projectStore.filters.page"
            @update:page="onPageChange"
          />
        </template>
      </template>
    </SidebarContainer>
  </PageLayout>
</template>

<script setup lang="ts">
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';

  import { useSmallDevice } from '@/helpers/breakpoints';
  import { RouteNames } from '@/router/types/route-names';
  // components
  import ProjectSearch from '@/components/project/ProjectSearch.vue';
  import ProjectSearchBadStub from '@/components/project/ProjectSearchBadStub.vue';
  import SidebarContainer from '@/components/layout/SidebarContainer.vue';
  import ProjectListFilter from '@/components/project/ProjectListFilter.vue';
  import ProjectList from '@/components/project/ProjectList.vue';
  import BasePagination from '@/components/ui/BasePagination.vue';
  import PageLayout from '@/components/layout/PageLayout.vue';
  import OpenProjectFilterModalButton from '@/components/project/OpenProjectFilterModalButton.vue';
  import ProjectListFilterModal from '../components/project/ProjectListFilterModal.vue';
  import { useGetProjectListWithFiltersQuery } from '@/api/ProjectApi/hooks/useGetProjectListWithFiltersQuery';
  import { useWatchProjectQueries } from '@/hooks/useProjectFilters';

  useWatchProjectQueries(RouteNames.HOME);

  const projectStore = useProjectsStore();
  const isSmallDevice = useSmallDevice();

  const projectListQuery = useGetProjectListWithFiltersQuery();

  const PROJECTS_PER_PAGE = 7;
  const PAGES_VISIBLE_DESKTOP = 7;
  const PAGES_VISIBLE_MOBILE = 4;

  function onPageChange(page: number) {
    projectStore.setFilters({ page });
    projectStore.updateFilters();
  }
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

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

    @media (max-width: $tablet) {
      margin-top: 1.875rem;
    }
  }

  .title {
    margin-bottom: 0.6875rem;
  }
</style>
