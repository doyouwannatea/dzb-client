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
    <ProjectTabs
      v-if="!error && !loading && project"
      :project-state="project.state"
    />
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
  import { watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { RouterView, useRoute } from 'vue-router';
  import { RouteNames } from '@/router/types/route-names';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  // components
  import PageLayout from '@/components/layout/PageLayout.vue';
  import BaseBreadcrumbs from '@/components/ui/BaseBreadcrumbs.vue';
  import ProjectTabs from '@/components/project/ProjectTabs.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';

  const route = useRoute();
  const projectsStore = useProjectsStore();
  const { loading, error, openedProject: project } = storeToRefs(projectsStore);

  watch(
    () => route.params.id,
    (projectId) => {
      if (projectId) {
        projectsStore.getSingleProject(Number(projectId));
      }
    },
    { immediate: true },
  );
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .page-title {
    margin-top: 1.625rem;
    margin-bottom: 1.5rem;

    @media (max-width: $tablet) {
      font-size: 1.75rem;
      line-height: 2.5rem;
    }
  }

  .breadcrumbs {
    margin-top: 2rem;
  }
</style>
