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
