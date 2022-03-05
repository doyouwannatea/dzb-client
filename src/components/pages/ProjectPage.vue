<template>
  <PageLayout>
    <header class="header">
      <BaseBreadcrumbs
        class="breadcrumbs"
        :breadcrumbs="[
          {
            title: 'Все проекты',
            to: { name: RouteNames.HOME },
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
      <BaseButton
        variant="link"
        @click="$router.push({ name: RouteNames.HOME })"
      >
        назад к списку
      </BaseButton>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import PageLayout from '@/components/unique/PageLayout.vue';
  import BaseBreadcrumbs from '@/components/base/BaseBreadcrumbs.vue';
  import BaseButton from '@/components/base/BaseButton.vue';
  import ProjectDetails from '../ProjectDetails.vue';
  import useSingleProject from '@/hooks/useSingleProject';
  import { RouteNames } from '@/router/types/route-names';
  import { hasHistory } from '@/helpers/history';

  const route = useRoute();

  const {
    error,
    loading,
    data: project,
  } = useSingleProject(Number(route.params.id));
</script>

<style scoped>
  .page-title {
    margin-top: 1.625rem;
    margin-bottom: 1.5rem;
  }

  .breadcrumbs {
    margin-top: 2rem;
  }
</style>
