<template>
  <ul class="breadcrumbs">
    <li
      v-for="({ to, title, back }, index) in props.breadcrumbs"
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
  import { RouterLink } from 'vue-router';
  import { hasHistory } from '@/helpers/history';
  import { RouteNames } from '@/router/types/route-names';
  import { Breadcrumb } from '@/models/components/BaseBreadcrumbs';

  interface Props {
    /**
     * Навигационная цепочка, путь от некоего начального элемента (корня файловой системы, главной страницы сайта и т. п.) до текущей страницы
     */
    breadcrumbs: Breadcrumb[];
  }

  const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .breadcrumbs {
    display: flex;
    padding-left: 0;
    list-style: none;

    @media (max-width: $tablet) {
      flex-wrap: wrap;
    }
  }

  .breadcrumbs-item {
    font-family: Montserrat, Arial, Helvetica, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: normal;
    color: #7b7b7b;

    @media (max-width: $tablet) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .breadcrumbs-item:not(:last-child)::after {
    margin-right: 0.375rem;
    margin-left: 0.375rem;
    color: var(--text-color);
    content: '/';
  }

  .breadcrumbs-link {
    padding: 0;
    color: var(--text-color);
    text-decoration: none;
    cursor: pointer;
    border: 0;
  }

  .breadcrumbs-link:hover {
    text-decoration: underline;
  }
</style>
