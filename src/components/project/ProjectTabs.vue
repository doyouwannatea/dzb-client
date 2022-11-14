<template>
  <div class="wrapper">
    <RouterLink class="project-tab" :to="{ name: RouteNames.PROJECT_DETAILS }">
      о проекте
    </RouterLink>
    <RouterLink
      class="project-tab"
      :to="{ name: RouteNames.PROJECT_PARTICIPATIONS }"
    >
      список заявок
    </RouterLink>
    <RouterLink
      v-if="$props.projectState.id !== StateID.RecruitingState"
      class="project-tab"
      :to="{ name: RouteNames.PROJECT_PARTICIPANTS }"
    >
      список участников
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { State, StateID } from '@/models/ProjectState';
  import { RouteNames } from '@/router/types/route-names';

  interface Props {
    projectState: State;
  }
  defineProps<Props>();
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints.scss';

  .wrapper {
    display: flex;
  }

  .project-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 3rem;
    color: var(--text-color);
    text-decoration: none;
    text-transform: uppercase;
    text-align: center;

    @media (max-width: $mobile-s) {
      padding: 1rem 0.5rem;
      flex: 1;
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

  .project-tab.router-link-exact-active {
    &:first-child:after,
    &:last-child:after {
      position: absolute;
      bottom: -0.5625rem;
      width: 0.3125rem;
      height: 0.5625rem;
      content: '';
      background-color: #fff;
    }

    &:first-child:after {
      left: 0;
    }

    &:last-child:after {
      right: 0;
    }
  }

  .project-tab:hover {
    color: var(--accent-color-1);
  }
</style>
