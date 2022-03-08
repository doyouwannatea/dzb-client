<template>
  <BasePageLayout>
    <header class="header">
      <h1 class="title page-title">Профиль пользователя</h1>
    </header>
    <SidebarContainer>
      <template #sidebar>
        <ProfileNavigation />
        <DeadlineTimer />
      </template>

      <template #main>
        <RouterView></RouterView>
      </template>
    </SidebarContainer>
  </BasePageLayout>
</template>

<script setup lang="ts">
  import { RouterView, useRouter } from 'vue-router';
  import BasePageLayout from '@/components/unique/PageLayout.vue';
  import SidebarContainer from '@/components/SidebarContainer.vue';
  import ProfileNavigation from '../unique/ProfileNavigation.vue';
  import DeadlineTimer from '../DeadlineTimer.vue';
  import { watch } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import { RouteNames } from '@/router/types/route-names';

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
