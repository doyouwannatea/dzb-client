<template>
  <div>
    <RouterLink class="project-tab" :to="{ name: RouteNames.PROJECT_DETAILS }">
      о проекте
    </RouterLink>
    <RouterLink
      class="project-tab"
      :to="{ name: RouteNames.PROJECT_REQUESTS_LIST }"
    >
      список заявок
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
  import { RouteNames } from '@/router/types/route-names';
  import { RouterLink } from 'vue-router';
</script>

<style scoped>
  .project-tab {
    text-transform: uppercase;
    color: var(--text-color);
    text-decoration: none;
    display: inline-block;
    padding: 1rem 3rem;
  }

  .project-tab.router-link-exact-active {
    border-radius: 0.625rem 0.625rem 0 0;
    background: #ffffff;
    box-shadow: 0px 0px 0.3125rem rgba(0, 0, 0, 0.18);
    position: relative;
  }

  .project-tab.router-link-exact-active::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.3125rem;
    width: 100%;
    height: 0.4rem;
    background-color: #fff;
    border-radius: 0.625rem;
  }

  .project-tab.router-link-exact-active:first-child:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.5625rem;
    height: 0.5625rem;
    width: 0.3125rem;
    background-color: #fff;
  }

  .project-tab:hover {
    color: var(--accent-color-1);
  }
</style>
