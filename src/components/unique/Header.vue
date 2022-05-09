<template>
  <header class="header">
    <BaseContainer class="container" size="lg">
      <RouterLink
        class="clear-link align-self-center"
        :to="{ name: RouteNames.HOME }"
      >
        <AppLogo />
      </RouterLink>
      <Navigation />
      <HeaderUserActions />
    </BaseContainer>
  </header>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import BaseContainer from '../base/BaseContainer.vue';
  import Navigation from './Navigation.vue';
  import HeaderUserActions from '../HeaderUserActions.vue';
  import AppLogo from '../AppLogo.vue';
  import { RouteNames } from '@/router/types/route-names';
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
