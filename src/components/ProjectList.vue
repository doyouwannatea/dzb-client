<template>
  <ul class="project-list">
    <li>
      <ProjectCard></ProjectCard>
    </li>
    <li>
      <ProjectCard></ProjectCard>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import ProjectCard from './ProjectCard.vue';
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
