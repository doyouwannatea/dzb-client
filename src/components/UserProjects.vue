<template>
  <div v-if="loading">loading...</div>
  <div v-if="error">{{ error }}</div>
  <div v-if="projectsList && !projectsList.length">у вас еще нет проектов</div>
  <ProjectList
    v-if="!loading && !error && projectsList"
    :project-list="projectsList"
  />
</template>

<script setup lang="ts">
  import ProjectList from '@/components/ProjectList.vue';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import { storeToRefs } from 'pinia';

  const { projectsList, loading, error } = storeToRefs(useAuthStore());
</script>
