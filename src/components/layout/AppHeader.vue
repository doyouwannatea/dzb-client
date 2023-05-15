<template>
  <header class="header">
    <BaseContainer class="container" :size="ContainerSize.lg">
      <RouterLink
        class="logo clear-link align-self-center"
        :to="{ name: RouteNames.HOME }"
      >
        <AppLogo />
      </RouterLink>
      <AppNavigation v-if="!isSmallDevice" />
      <DeadlineTimerNavigation
        v-if="time"
        :start="new Date(time[0])"
        :deadline="new Date(time[1])"
        timer-text="до конца приема заявок"
      />
      <HeaderUserActions v-if="!isSmallDevice" />
    </BaseContainer>
  </header>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { RouteNames } from '@/router/types/route-names';
  import BaseContainer from '../ui/BaseContainer.vue';
  import AppLogo from '../ui/AppLogo.vue';
  import AppNavigation from './AppNavigation.vue';
  import HeaderUserActions from '../user/HeaderUserActions.vue';
  import DeadlineTimerNavigation from '@/components/layout/DeadlineTimerNavigation.vue';
  import { useSmallDevice } from '@/helpers/breakpoints';
  import { useUserTimer } from '@/hooks/useUserTimer';
  import { ContainerSize } from '@/models/BaseContainer';

  const isSmallDevice = useSmallDevice();
  const time = useUserTimer();
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  /* Container */
  .container {
    display: flex;
    justify-content: space-between;
    height: 7rem;

    @media (max-width: $tablet) {
      height: initial;
      padding-top: 0.875rem;
      padding-bottom: 0.875rem;
    }
  }

  /* Header */
  .header {
    position: relative;
    background: #fff;
  }

  .header::before {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1.5px;
    content: '';
    background-color: var(--gray-color-1);
  }
</style>
