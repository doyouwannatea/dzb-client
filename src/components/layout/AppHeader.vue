<template>
  <header class="header">
    <BaseContainer class="container" size="lg">
      <RouterLink
        class="clear-link align-self-center"
        :to="{ name: RouteNames.HOME }"
      >
        <AppLogo />
      </RouterLink>
      <AppNavigation />
      <HeaderUserActions />
    </BaseContainer>
  </header>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { RouteNames } from '@/router/types/route-names';
  // components
  import BaseContainer from '../ui/BaseContainer.vue';
  import AppLogo from '../ui/AppLogo.vue';
  import AppNavigation from './AppNavigation.vue';
  import HeaderUserActions from '../user/HeaderUserActions.vue';
</script>

<style scoped>
  /* Container */
  .container {
    display: flex;
    justify-content: space-between;
    height: 7rem;
  }

  /* Header */
  .header {
    position: relative;
    background: #fff;
  }
  .header::before {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1.5px;
    content: '';
    background-color: var(--gray-color-1);
  }
</style>
