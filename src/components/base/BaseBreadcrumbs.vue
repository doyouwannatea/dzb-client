<template>
  <ul class="breadcrumbs">
    <li
      v-for="({ to, title, back }, index) in breadcrumbs"
      :key="index"
      class="breadcrumbs-item"
    >
      <button
        v-if="back"
        class="breadcrumbs-link"
        @click="
          hasHistory()
            ? $router.back()
            : $router.push({ name: RouteNames.HOME })
        "
      >
        {{ title }}
      </button>
      <RouterLink v-else-if="to" :to="to" class="breadcrumbs-link">
        {{ title }}
      </RouterLink>
      <span v-else>{{ title }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import type { RouteLocationRaw } from 'vue-router';
  import { RouterLink } from 'vue-router';
  import { hasHistory } from '@/helpers/history';
  import { RouteNames } from '@/router/types/route-names';
  defineProps<{
    breadcrumbs: {
      to?: RouteLocationRaw;
      back?: boolean;
      title: string;
    }[];
  }>();
</script>

<style scoped>
  .breadcrumbs {
    padding-left: 0;
    list-style: none;
    display: flex;
  }
  .breadcrumbs-item {
    font-family: 'Montserrat';
    font-size: 0.875rem;
    font-weight: 400;
    line-height: normal;

    color: #7b7b7b;
  }
  .breadcrumbs-item:not(:last-child)::after {
    content: '/';
    margin-left: 0.375rem;
    margin-right: 0.375rem;
    color: var(--text-color);
  }
  .breadcrumbs-link {
    color: var(--text-color);
    text-decoration: none;
    border: 0;
    padding: 0;
    cursor: pointer;
  }
  .breadcrumbs-link:hover {
    text-decoration: underline;
  }
</style>
