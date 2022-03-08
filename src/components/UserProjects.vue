<template>
  <ProjectList :project-list="projectList" />
</template>

<script setup lang="ts">
  import ProjectList from '@/components/ProjectList.vue';
  import { projectListResponse } from '@/models/mock/project';

  const projectList = projectListResponse.data.slice(0, 2);
</script>
