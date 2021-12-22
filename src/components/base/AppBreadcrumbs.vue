<template>
  <ul class="breadcrumbs">
    <li
      v-for="({ to, title, back }, index) in breadcrumbs"
      :key="index"
      class="breadcrumbs-item"
    >
      <button v-if="back" class="breadcrumbs-link" @click="$router.back()">
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
    font-size: 14px;
    font-weight: 400;
    line-height: normal;

    color: #7b7b7b;
  }
  .breadcrumbs-item:not(:last-child)::after {
    content: '/';
    margin-left: 6px;
    margin-right: 6px;
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
