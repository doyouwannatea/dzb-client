<template>
  <ProjectList
    v-if="userProjects.isLoading.value"
    loading
    :loading-cards-length="3"
  />
  <div v-else-if="userProjects.isError.value">
    {{ userProjects.error.value }}
  </div>
  <BaseStub
    v-else-if="userProjects.data.value?.length === 0"
    title="Проекты не найдены :("
    subtitle="У вас пока нет ни одного активного или архивного проекта"
  />
  <ProjectList v-else :project-list="userProjects.data.value" />
</template>

<script setup lang="ts">
  import { useGetUserProjectsQuery } from '@/api/SharedApi/hooks/useGetUserProjectsQuery';
  import ProjectList from '@/components/project/ProjectList.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';

  const userProjects = useGetUserProjectsQuery();
</script>
