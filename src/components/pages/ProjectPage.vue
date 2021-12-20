<template>
  <PageLayout>
    <header class="header">
      <AppBreadcrumbs class="breadcrumbs" />
      <h1 class="page-title">{{ project?.title || 'загрузка' }}</h1>
    </header>
    <div v-if="loading">loading...</div>
    <div v-if="error">{{ error }}</div>
    <ProjectDetails v-if="project && !loading && !error" :project="project" />
    <div class="d-flex justify-content-center mt-3">
      <AppButton
        is="router-link"
        variant="link"
        :to="{ name: RouteNames.HOME }"
      >
        назад к списку
      </AppButton>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import PageLayout from '@/components/base/PageLayout.vue';
  import AppBreadcrumbs from '@/components/base/AppBreadcrumbs.vue';
  import AppButton from '@/components/base/AppButton.vue';
  import ProjectDetails from '../ProjectDetails.vue';
  import useSingleProject from '@/hooks/useSingleProject';
  import { RouteNames } from '@/router/types/route-names';

  const route = useRoute();

  const {
    error,
    loading,
    data: project,
  } = useSingleProject(Number(route.params.id));
</script>

<style scoped>
  /* Text */
  .page-title {
    margin-top: 26px;
    margin-bottom: 24px;
  }

  /* Components */
  .breadcrumbs {
    margin-top: 32px;
  }
</style>
