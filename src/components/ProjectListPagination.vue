<template>
  <nav class="pagination">
    <ul class="pagination-list">
      <li :class="['pagination-item', { 'disabled-item': currentPage <= 1 }]">
        <RouterLink
          :class="['pagination-link', 'pagination-arrow']"
          :tabindex="currentPage <= 1 ? -1 : 0"
          :to="{
            name: RouteNames.HOME,
            query: { ...$route.query, page: currentPage - 1 },
          }"
        >
          &lt;
        </RouterLink>
      </li>
      <li
        v-for="i in genPages()"
        :key="i"
        :class="['pagination-item', { active: i === currentPage }]"
      >
        <RouterLink
          class="pagination-link"
          :to="{
            name: RouteNames.HOME,
            query: { ...$route.query, page: i },
          }"
        >
          {{ i }}
        </RouterLink>
      </li>
      <li
        :class="[
          'pagination-item',
          { 'disabled-item': currentPage >= totalPages },
        ]"
      >
        <RouterLink
          :class="['pagination-link', 'pagination-arrow']"
          :tabindex="currentPage >= totalPages ? -1 : 0"
          :to="{
            name: RouteNames.HOME,
            query: { ...$route.query, page: currentPage + 1 },
          }"
        >
          &gt;
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  import type { LocationQuery } from 'vue-router';
  import { computed, ref, watch } from 'vue';
  import { RouterLink, useRoute } from 'vue-router';
  import { RouteNames } from '@/router/types/route-names';
  const route = useRoute();
  const props = defineProps({
    totalItems: { type: Number, required: true },
    pageSize: { type: Number, required: true },
    pagesVisible: { type: Number, required: true },
    defaultPage: { type: Number, default: 1 },
  });

  // Computed
  const totalPages = computed(() =>
    Math.ceil(props.totalItems / props.pageSize),
  );
  // Refs
  const currentPage = ref(1);
  const startPage = ref(1);
  const endPage = ref(1);

  watch(() => route.query, updatePages, { immediate: true });

  // генерирует видимые ссылки пагинации
  function genPages() {
    const pages = [1];

    for (let i = startPage.value + 1; i <= endPage.value - 1; i++) {
      pages.push(i);
    }

    if (totalPages.value !== 1) {
      pages.push(totalPages.value);
    }

    return pages;
  }

  // обновляет состояние компонента
  function updatePages(query: LocationQuery) {
    currentPage.value = isNaN(Number(query.page))
      ? props.defaultPage
      : Number(query.page);
    if (currentPage.value < 1) {
      currentPage.value = 1;
    }
    startPage.value = currentPage.value - Math.ceil(props.pagesVisible / 2);
    endPage.value = currentPage.value + Math.floor(props.pagesVisible / 2) - 1;

    if (startPage.value <= 0) {
      endPage.value -= startPage.value - 1;
      startPage.value = 1;
    }

    if (endPage.value > totalPages.value) {
      endPage.value = totalPages.value;
      if (endPage.value > props.pageSize) {
        startPage.value = endPage.value - props.pagesVisible + 1;
      }
    }
  }
</script>

<style scoped>
  .pagination {
    background: #ffffff;
    box-shadow: 0px 0px 0.3125rem rgba(0, 0, 0, 0.18);
    border-radius: 0.625rem;
    margin-bottom: 0.9375rem;
    margin-top: 0.9375rem;
  }

  .pagination-list {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 2.25rem;
  }

  .pagination-item {
    width: 2.5625rem;
    height: 3.3125rem;
  }

  .disabled-item {
    pointer-events: none;
    opacity: 0.4;
  }

  .pagination-link {
    font-family: inherit;
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.625rem;
    text-transform: uppercase;
    color: var(--gray-color-2);
    text-decoration: none;
    display: inline-block;
    width: 100%;
    height: 100%;
    border-bottom: 0.25rem solid transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pagination-link:hover,
  .pagination-item.active .pagination-link {
    border-bottom-color: var(--accent-color-2);
  }

  .pagination-arrow:hover {
    color: var(--accent-color-2);
    border-bottom-color: transparent;
  }
</style>
