<template>
  <div>
    <RouterLink class="project-tab" :to="{ name: RouteNames.PROJECT_DETAILS }">
      о проекте
    </RouterLink>
    <RouterLink
      class="project-tab"
      :to="{ name: RouteNames.PROJECT_PARTICIPATIONS }"
    >
      список заявок
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
  import { RouteNames } from '@/router/types/route-names';
  import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints.scss';

  .project-tab {
    display: inline-block;
    padding: 1rem 3rem;
    color: var(--text-color);
    text-decoration: none;
    text-transform: uppercase;

    @media (max-width: $mobile-s) {
      padding: 1rem 2rem;
    }
  }

  .project-tab.router-link-exact-active {
    position: relative;
    background: #ffffff;
    border-radius: 0.625rem 0.625rem 0 0;
    box-shadow: 0px 0px 0.3125rem rgba(0, 0, 0, 0.18);
  }

  .project-tab.router-link-exact-active::before {
    position: absolute;
    bottom: -0.3125rem;
    left: 0;
    width: 100%;
    height: 0.4rem;
    content: '';
    background-color: #fff;
    border-radius: 0.625rem;
  }

  .project-tab.router-link-exact-active:first-child:after {
    position: absolute;
    bottom: -0.5625rem;
    left: 0;
    width: 0.3125rem;
    height: 0.5625rem;
    content: '';
    background-color: #fff;
  }

  .project-tab:hover {
    color: var(--accent-color-1);
  }
</style>
