<template>
  <PageLayout>
    <header class="header">
      <h1 class="title page-title">Профиль пользователя</h1>
    </header>
    <SidebarContainer>
      <template #sidebar>
        <UserNavigation />
        <DeadlineTimer />
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

<style scoped>
  .header {
    margin-top: 4.75rem;
    margin-bottom: 2.8125rem;
  }

  .title {
    margin-bottom: 0.6875rem;
  }
</style>
