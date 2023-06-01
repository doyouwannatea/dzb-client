<template>
  <ul class="project-list">
    <template v-if="loading">
      <li v-for="index of loadingCardsLength" :key="index">
        <BaseEmptyCard />
      </li>
    </template>
    <template v-else>
      <li v-for="project of projectList" :key="project.id">
        <ProjectCard :project="project" />
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
  import type { Project } from '@/models/Project';
  import BaseEmptyCard from '../ui/BaseEmptyCard.vue';
  import ProjectCard from './ProjectCard.vue';

  interface Props {
    projectList?: Project[];
    loading?: boolean;
    loadingCardsLength?: number;
  }

  withDefaults(defineProps<Props>(), {
    loading: false,
    loadingCardsLength: 1,
    projectList: () => [],
  });
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
