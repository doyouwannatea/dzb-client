<template>
  <nav class="nav">
    <ul class="nav-list">
      <template v-for="link in routes" :key="link.name">
        <li class="nav-item">
          <RouterLink class="nav-link" :to="{ name: link.name }">
            {{ link.meta.title }}
          </RouterLink>
        </li>
      </template>
      <li class="nav-item">
        <RouterLink
          class="nav-link contacts-link"
          :to="{ ...$route, hash: '#footer' }"
        >
          контакты
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { useMainNavigationRoutes } from '@/hooks/useRoutes';

  const routes = useMainNavigationRoutes();
</script>

<style scoped>
  .nav {
    color: var(--text-color);
  }
  .nav-list {
    z-index: 1;
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 0;
    list-style: none;
  }

  .nav-item {
    height: 100%;
  }

  .nav-link {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-right: 1.9em;

    padding-left: 1.9em;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.25em;
    color: inherit;
    text-decoration: none;
    text-transform: uppercase;

    border-bottom: 0.25rem solid transparent;
  }

  .nav-link.router-link-exact-active:not(.contacts-link) {
    border-bottom-color: var(--accent-color-2);
  }

  .nav-link:hover {
    border-bottom-color: var(--accent-color-2);
  }
</style>
