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
          :deadline="new Date('2022/12/01')"
          timer-text="до конца приема заявок на проектное обучение"
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
  import { RouterView } from 'vue-router';
  import { useMobileS } from '@/helpers/breakpoints';
  import { useWatchAuthorization } from '@/hooks/useWatchAuthorization';
  // components
  import SidebarContainer from '@/components/layout/SidebarContainer.vue';
  import UserNavigation from './UserNavigation.vue';
  import DeadlineTimer from '@/components/layout/DeadlineTimer.vue';
  import PageLayout from '@/components/layout/PageLayout.vue';

  const isMobile = useMobileS();
  useWatchAuthorization();
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .sidebar-container {
    @media (max-width: $mobile-s) {
      margin-top: 1.875rem;
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
