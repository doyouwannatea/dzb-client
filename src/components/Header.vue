<template>
  <header class="header">
    <Container class="container" size="lg">
      <RouterLink class="clear-link align-self-center" :to="{ name: 'home' }">
        <Logo></Logo>
      </RouterLink>
      <Navigation></Navigation>
      <UserActions></UserActions>
    </Container>
  </header>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import Container from '../layout/Container.vue';
  import Navigation from './Navigation.vue';
  import Logo from './Logo.vue';
  import UserActions from './UserActions.vue';
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
