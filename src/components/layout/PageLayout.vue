<template>
  <BaseLayout>
    <template #header>
      <AppHeader />
      <BottomNavigationBar class="mobile-nav-bar" />
    </template>
    <template #content>
      <BaseContainer size="md">
        <slot></slot>
      </BaseContainer>
    </template>
    <template #footer>
      <AppFooter />
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
  // components
  import BaseLayout from '../ui/BaseLayout.vue';
  import AppHeader from './AppHeader.vue';
  import AppFooter from './AppFooter.vue';
  import BaseContainer from '../ui/BaseContainer.vue';
  import BottomNavigationBar from './mobile/BottomNavigationBar.vue';
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints.scss';

  .mobile-nav-bar {
    display: none;

    @media (max-width: $mobile-s) {
      display: block;
    }
  }
</style>
