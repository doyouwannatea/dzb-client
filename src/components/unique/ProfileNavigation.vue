<template>
  <ul class="list">
    <template v-for="link in routes" :key="link.name">
      <li class="item">
        <RouterLink class="action" :to="{ name: link.name }">
          {{ link.meta.title }}
        </RouterLink>
      </li>
    </template>

    <li class="item">
      <button class="action" @click="authStore.exit()">Выйти из профиля</button>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { useRoledUserNavigationRoutes } from '@/hooks/useRoutes';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import { RouterLink } from 'vue-router';

  const authStore = useAuthStore();
  const routes = useRoledUserNavigationRoutes();
</script>

<style scoped>
  .list {
    padding: 0 1.375rem;
    background: #ffffff;
    border: 1px solid var(--gray-color-1);
    border-radius: 0.625rem;
  }
  .item {
    list-style: none;
  }

  .item:not(:last-child) {
    border-bottom: 1px solid var(--gray-color-1);
  }

  .action {
    display: inline-block;
    width: 100%;
    padding: 1.25rem 0;
    font-size: 1.25rem;
    line-height: 1.625rem;
    color: var(--text-color);

    /* for button */
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    background: transparent;
    border: none;
  }

  .action:hover,
  .action.router-link-exact-active {
    color: var(--accent-color-1);
  }
</style>
