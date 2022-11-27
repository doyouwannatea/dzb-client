<template>
  <header class="header">
    <BaseContainer class="container" size="lg">
      <RouterLink
        class="logo clear-link align-self-center"
        :to="{ name: RouteNames.HOME }"
      >
        <AppLogo />
      </RouterLink>
      <AppNavigation class="navigation" />
      <DeadlineTimerNavigation
        :deadline="new Date('2022/12/02')"
        timer-text="до конца приема заявок"
      />
      <HeaderUserActions class="actions" />
    </BaseContainer>
  </header>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { RouteNames } from '@/router/types/route-names';
  // components
  import BaseContainer from '../ui/BaseContainer.vue';
  import AppLogo from '../ui/AppLogo.vue';
  import AppNavigation from './AppNavigation.vue';
  import HeaderUserActions from '../user/HeaderUserActions.vue';
  import DeadlineTimerNavigation from '@/components/layout/DeadlineTimerNavigation.vue';
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  /* Container */
  .container {
    display: flex;
    justify-content: space-between;
    height: 7rem;

    @media (max-width: $mobile-s) {
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

  .navigation,
  .actions {
    @media (max-width: $mobile-s) {
      display: none;
    }
  }
</style>
