<template>
  <ul class="container">
    <li
      v-for="{ title, year, projectId } in props.items"
      :key="projectId"
      :class="{ current: projectId === props.currentProjectId }"
      class="project"
    >
      <p class="year">{{ year }}</p>
      <RouterLink class="link" :to="toProjectRoute(projectId)">
        {{ title }}
      </RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { toProjectRoute } from '@/router/utils/routes';

  interface Project {
    title: string;
    year: string;
    projectId: number;
  }

  interface Props {
    items: Project[];
    currentProjectId: number;
  }

  const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
  }

  .year {
    margin: 1.6875rem 0 1.25rem;
    font-size: 1.125rem;
    font-weight: 800;
    color: var(--gray-color-2);
  }

  .link {
    display: block;
    font-size: 1.125rem;
    line-height: 150%;
    color: var(--accent-color-1);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .project {
    position: relative;
    width: 20.625rem;
    padding-right: 1rem;
    list-style: none;
    border-top: 0.25rem solid var(--gray-color-1);

    &::before {
      position: absolute;
      top: -0.6563rem;
      width: 1.0625rem;
      height: 1.0625rem;
      content: '';
      background-color: var(--gray-color-2);
      border-radius: 50%;
    }

    &:last-child {
      border-color: transparent;
    }
  }

  .current {
    font-size: 1.125rem;
    font-weight: 800;
    color: var(--accent-color-1);

    &::before {
      background-color: var(--accent-color-1);
    }

    &::after {
      position: absolute;
      top: -2.0938rem;
      left: -2.25rem;
      content: 'Вы здесь';
    }

    .year {
      color: inherit;
    }
  }
</style>
