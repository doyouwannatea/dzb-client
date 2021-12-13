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
        <ProjectList></ProjectList>
      </template>
    </SidebarContainer>
  </BasePageLayout>
</template>

<script setup lang="ts">
  import BasePageLayout from '@/components/base/BasePageLayout.vue';
  import ProjectList from '@/components/ProjectList.vue';
  import ProjectListFilters from '@/components/ProjectListFilters.vue';
  import ProjectListSort from '@/components/ProjectListSort.vue';
  import ProjectListSearch from '@/components/ProjectListSearch.vue';
  import SidebarContainer from '@/components/SidebarContainer.vue';
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
