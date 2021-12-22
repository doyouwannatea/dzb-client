<template>
  <PageLayout>
    <header class="header">
      <AppBreadcrumbs
        class="breadcrumbs"
        :breadcrumbs="[
          {
            title: 'Все проекты',
            back: true,
          },
          {
            title: project?.title || '',
          },
        ]"
      />
      <h1 class="page-title">
        <span v-if="loading">загрузка...</span>
        <span v-if="error">{{ error }}</span>
        <span v-if="project">{{ project.title }}</span>
      </h1>
    </header>
    <ProjectDetails v-if="project && !loading && !error" :project="project" />
    <div class="d-flex justify-content-center mt-3">
      <AppButton variant="link" @click="$router.back()">
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
  .page-title {
    margin-top: 26px;
    margin-bottom: 24px;
  }

  .breadcrumbs {
    margin-top: 32px;
  }
</style>
