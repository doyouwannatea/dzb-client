<template>
  <ul class="project-list">
    <li v-for="listItem of projectList" :key="listItem.id">
      {{ listItem.title }}
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
    list-style: none;
    padding-left: 0;
    gap: 15px;
  }
</style>
