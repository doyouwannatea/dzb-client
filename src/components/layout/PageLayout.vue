<template>
  <BaseLayout>
    <template #header>
      <AppHeader />
      <UserNavigation
        v-if="authStore.isAuth"
        variant="mobile"
        class="mobile-user-nav"
      />
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
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  // components
  import BaseLayout from '../ui/BaseLayout.vue';
  import AppHeader from './AppHeader.vue';
  import AppFooter from './AppFooter.vue';
  import BaseContainer from '../ui/BaseContainer.vue';
  import BottomNavigationBar from './mobile/BottomNavigationBar.vue';
  import UserNavigation from '@/pages/UserPage/UserNavigation.vue';

  const authStore = useAuthStore();
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints.scss';

  .mobile-user-nav {
    display: none;

    @media (max-width: $mobile-s) {
      display: flex;
    }
  }
</style>
