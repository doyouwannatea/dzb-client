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
    <ProjectTabs v-if="!error && !loading" />
    <RouterView></RouterView>
    <div class="d-flex justify-content-center mt-3">
      <BaseButton
        case="uppercase"
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
  import { RouteNames } from '@/router/types/route-names';
  import { RouterView } from 'vue-router';
  import { onBeforeMount } from 'vue';
  import { useProjectsStore } from '@/stores/projects';
  import { storeToRefs } from 'pinia';
  import ProjectTabs from '../ProjectTabs.vue';

  const route = useRoute();
  const projectsStore = useProjectsStore();
  const { loading, error, openedProject: project } = storeToRefs(projectsStore);

  onBeforeMount(() => {
    projectsStore.getSingleProject(Number(route.params.id));
  });
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
