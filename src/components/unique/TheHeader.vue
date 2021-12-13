<template>
  <header class="header">
    <VContainer class="container" size="lg">
      <RouterLink class="clear-link align-self-center" :to="{ name: 'home' }">
        <VLogo></VLogo>
      </RouterLink>
      <TheNavigation></TheNavigation>
      <NavigationUserActions></NavigationUserActions>
    </VContainer>
  </header>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import VContainer from '../base/VContainer.vue';
  import TheNavigation from './TheNavigation.vue';
  import VLogo from '../base/VLogo.vue';
  import NavigationUserActions from '../NavigationUserActions.vue';
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
