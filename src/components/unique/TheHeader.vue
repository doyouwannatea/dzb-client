<template>
  <header class="header">
    <AppContainer class="container" size="lg">
      <RouterLink
        class="clear-link align-self-center"
        :to="{ name: RouteNames.HOME }"
      >
        <AppLogo />
      </RouterLink>
      <TheNavigation />
      <HeaderUserActions />
    </AppContainer>
  </header>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import AppContainer from '../base/AppContainer.vue';
  import TheNavigation from './TheNavigation.vue';
  import AppLogo from '../base/AppLogo.vue';
  import HeaderUserActions from '../HeaderUserActions.vue';
  import { RouteNames } from '@/router/types/route-names';
</script>

<style scoped>
  /* Container */
  .container {
    height: 7rem;
    display: flex;
    justify-content: space-between;
  }

  /* Header */
  .header {
    position: relative;
    background: #fff;
  }
  .header::before {
    content: '';
    width: 100%;
    height: 1.5px;
    background-color: var(--gray-color-1);
    position: absolute;
    bottom: 0;
  }
</style>
