<template>
  <ul class="project-list">
    <li>
      <ProjectCard
        status="new"
        :tags="['тег', 'другой тег', 'другой тег', 'другой тег', 'другой тег']"
      />
    </li>
    <li>
      <ProjectCard
        status="active"
        :tags="[
          'JavaScript',
          'Web',
          'Конференция',
          'Конференция',
          'Web',
          'Конференция',
          'Конференция',
          'JavaScript',
          'Конференция',
        ]"
      />
    </li>
    <li>
      <ProjectCard
        status="recruitment"
        :tags="['JavaScript', 'Web', 'Конференция', 'Конференция']"
      />
    </li>
    <li>
      <ProjectCard status="closed" />
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
