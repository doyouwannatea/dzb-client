<template>
  <nav class="navigation">
    <BaseContainer class="container" size="lg">
      <template v-for="link in mobileRoutes" :key="link.name">
        <RouterLink class="link" :to="{ name: link.name }">
          <div v-if="link.meta.svg" v-html="link.meta.svg"></div>
          {{ link.meta.title }}
        </RouterLink>
      </template>
    </BaseContainer>
  </nav>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { useMobileNavigationRoutes } from '@/hooks/useRoutes';

  const mobileRoutes = useMobileNavigationRoutes();
</script>

<style scoped>
  .navigation {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    padding: 0.875rem;
    padding-bottom: 1.4375rem;
    background: #ffffff;
    border-radius: 1.25rem 1.25rem 0px 0px;
    box-shadow: 0px -0.4375rem 1.25rem rgba(0, 0, 0, 0.07);
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .link {
    display: flex;

    flex: 1;
    flex-direction: column;
    gap: 0.5625rem;
    align-items: center;
    min-width: 100px;
    font-family: 'Mont', Arial, Helvetica, sans-serif;
    font-size: 0.625rem;
    font-weight: 600;
    color: var(--gray-color-2);

    text-decoration: none;
  }

  .link:hover,
  .link:active,
  .link.router-link-exact-active {
    color: var(--accent-color-1);
  }

  .link:deep(svg) {
    width: 1.875rem;
    height: 1.875rem;
  }

  .link:deep(path) {
    stroke: var(--gray-color-2);
  }

  .link:hover:deep(path),
  .link:focus-visible:deep(path) {
    stroke: var(--accent-color-1);
  }

  .link.router-link-exact-active {
    color: var(--accent-color-1);
  }

  .link.router-link-exact-active:deep(path) {
    stroke: var(--accent-color-1);
  }
</style>
