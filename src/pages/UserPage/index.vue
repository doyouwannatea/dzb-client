<template>
  <PageLayout>
    <UserNavigation v-if="isMobile" variant="mobile" />
    <header class="header">
      <h1 class="title page-title">Профиль пользователя</h1>
    </header>
    <SidebarContainer class="sidebar-container">
      <template #sidebar>
        <UserNavigation variant="desktop" />
        <DeadlineTimer
          :deadline="new Date('2022/08/21 22:06:00')"
          timer-text="идёт добор заявок в проекты"
          after-timer-text="Прием заявок на проектное обучение закончен"
        />
      </template>
      <template #main>
        <RouterView></RouterView>
      </template>
    </SidebarContainer>
  </PageLayout>
</template>

<script setup lang="ts">
  import { RouterView, useRouter } from 'vue-router';
  import { watch } from 'vue';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import { RouteNames } from '@/router/types/route-names';
  // components
  import SidebarContainer from '@/components/layout/SidebarContainer.vue';
  import UserNavigation from './UserNavigation.vue';
  import DeadlineTimer from '@/components/layout/DeadlineTimer.vue';
  import PageLayout from '@/components/layout/PageLayout.vue';
  import { useMobileS } from '@/helpers/breakpoints';

  const isMobile = useMobileS();
  const authStore = useAuthStore();
  const router = useRouter();

  watch(
    () => authStore.isAuth,
    (isAuth) => {
      if (!isAuth) {
        router.push({
          name: RouteNames.HOME,
        });
      }
    },
  );
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints.scss';

  .sidebar-container {
    @media (max-width: $mobile-s) {
      margin-top: 1.875rem;
      grid-template-columns: auto;

      & > :deep(.aside) {
        display: none;
      }
    }
  }

  .header {
    margin-top: 4.75rem;
    margin-bottom: 2.8125rem;

    @media (max-width: $mobile-s) {
      display: none;
    }
  }

  .title {
    margin-bottom: 0.6875rem;
  }
</style>
