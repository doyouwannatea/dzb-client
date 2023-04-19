<template>
  <PageLayout>
    <UserNavigation v-if="isSmallDevice" variant="mobile" />
    <header class="header">
      <h1 class="title page-title">Профиль пользователя</h1>
      <UserCreateProjectLink />
    </header>
    <SidebarContainer class="sidebar-container">
      <template #sidebar>
        <UserNavigation variant="desktop" />
        <DeadlineTimer
          v-if="
            !participationsStore.participationDeadlineDate &&
            authStore.profileData?.is_student
          "
          :deadline="new Date(Date.now())"
          timer-text=""
          after-timer-text="Загрузка даты конца приёма заявок на проекты..."
        />
        <DeadlineTimer
          v-if="
            participationsStore.participationDeadlineDate &&
            authStore.profileData?.is_student
          "
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
  import { useParticipationsStore } from '@/stores/participations/useParticipationsStore';
  // components
  import SidebarContainer from '@/components/layout/SidebarContainer.vue';
  import UserNavigation from './UserNavigation.vue';
  import DeadlineTimer from '@/components/layout/DeadlineTimer.vue';
  import PageLayout from '@/components/layout/PageLayout.vue';
  import UserCreateProjectLink from './UserCreateProjectLink.vue';
  import { useAuthStore } from '@/stores/auth/useAuthStore';

  const authStore = useAuthStore();
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 4.75rem;
    margin-bottom: 1.875rem;

    @media (max-width: $tablet) {
      display: none;
    }
  }
</style>
