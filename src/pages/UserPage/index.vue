<template>
  <PageLayout>
    <UserNavigation v-if="isSmallDevice" variant="mobile" />
    <header class="header">
      <h1 class="title page-title">Профиль пользователя</h1>
    </header>
    <SidebarContainer class="sidebar-container">
      <template #sidebar>
        <UserNavigation variant="desktop" />
        <DeadlineTimer
          v-if="!participationsStore.participationDeadlineDate"
          :deadline="new Date(Date.now())"
          timer-text=""
          after-timer-text="Загрузка даты конца приёма заявок на проекты..."
        />
        <DeadlineTimer
          v-if="participationsStore.participationDeadlineDate"
          :deadline="new Date(participationsStore.participationDeadlineDate)"
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
  import { useSmallDevice } from '@/helpers/breakpoints';
  import { useWatchAuthorization } from '@/hooks/useWatchAuthorization';
  // components
  import SidebarContainer from '@/components/layout/SidebarContainer.vue';
  import UserNavigation from './UserNavigation.vue';
  import DeadlineTimer from '@/components/layout/DeadlineTimer.vue';
  import PageLayout from '@/components/layout/PageLayout.vue';
  import { useParticipationsStore } from '@/stores/participations/useParticipationsStore';

  const isSmallDevice = useSmallDevice();
  const participationsStore = useParticipationsStore();
  useWatchAuthorization();
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .sidebar-container {
    @media (max-width: $tablet) {
      margin-top: 1.875rem;
    }
  }

  .header {
    margin-top: 4.75rem;
    margin-bottom: 2.8125rem;

    @media (max-width: $tablet) {
      display: none;
    }
  }

  .title {
    margin-bottom: 0.6875rem;
  }
</style>
