<template>
  <BaseStub
    v-if="userProjectList && !userProjectList.length"
    title="Проекты не найдены :("
    subtitle="У вас пока нет ни одного активного или архивного проекта"
  />
  <div v-if="error">{{ error }}</div>
  <ProjectList v-if="loading" loading :loading-cards-length="3" />
  <ProjectList
    v-if="!loading && !error && userProjectList"
    :project-list="userProjectList"
  />
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  import { useGetUserProjectList } from '@/hooks/useFetchStudentData';
  // components
  import ProjectList from '@/components/project/ProjectList.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';

  useGetUserProjectList();
  const { userProjectList, loading, error } = storeToRefs(useProjectsStore());
</script>
