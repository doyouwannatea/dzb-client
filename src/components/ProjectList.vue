<template>
  <ul class="project-list">
    <li v-for="project of projectList" :key="project.id">
      <ProjectCard :project="project" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import type { Project } from '@/models/Project';
  import ProjectCard from './ProjectCard.vue';
  defineProps<{ projectList: Project[] }>();
</script>

<style scoped>
  .project-list {
    display: flex;
    flex-direction: column;
    gap: 0.9375rem;
    padding-left: 0;
    list-style: none;
  }
</style>
