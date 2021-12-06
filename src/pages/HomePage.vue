<template>
  <BasePageLayout>
    <header class="header">
      <h1 class="title">Все проекты</h1>
      <p class="subtitle">
        На этой странице размещены проекты преподавателей и руководителей ИРНИТУ
      </p>
    </header>
    <aside class="top-filters">
      <ProjectListSearch></ProjectListSearch>
      <ProjectListSort></ProjectListSort>
    </aside>
    <div class="container">
      <aside class="aside">
        <ProjectListFilters></ProjectListFilters>
      </aside>
      <ProjectList></ProjectList>
    </div>
  </BasePageLayout>
</template>

<script setup lang="ts">
  import BasePageLayout from '@/layout/BasePageLayout.vue';
  import ProjectList from '@/components/ProjectList.vue';
  import ProjectListFilters from '@/components/ProjectListFilters.vue';
  import ProjectListSort from '@/components/ProjectListSort.vue';
  import ProjectListSearch from '@/components/ProjectListSearch.vue';
</script>

<style scoped>
  .top-filters {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 35px;
    margin-bottom: 18px;
  }

  .container {
    display: grid;
    grid-template-columns: 382px auto;
    gap: 34px;
  }

  .aside {
    background: #ffffff;
    border: 1px solid var(--gray-color-1);
    border-radius: 5px;
    align-self: flex-start;
  }

  .header {
    margin-top: 76px;
    margin-bottom: 45px;
  }

  .title {
    font-weight: 800;
    font-size: 40px;
    line-height: 51px;
    color: var(--text-color);
    margin-bottom: 11px;
  }

  .subtitle {
    font-size: 18px;
    line-height: 23px;
    color: #707070;
  }
</style>
