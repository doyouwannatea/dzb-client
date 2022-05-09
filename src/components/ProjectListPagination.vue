<template>
  <nav class="pagination">
    <ul class="pagination-list">
      <li :class="['pagination-item', { 'disabled-item': currentPage <= 1 }]">
        <button
          :disabled="currentPage <= 1"
          :class="['pagination-btn', 'pagination-arrow']"
          :tabindex="currentPage <= 1 ? -1 : 0"
          @click="setPage(currentPage - 1)"
        >
          &lt;
        </button>
      </li>
      <li
        v-for="i in genPages()"
        :key="i"
        :class="['pagination-item', { active: i === currentPage }]"
      >
        <button class="pagination-btn" @click="setPage(i)">
          {{ i }}
        </button>
      </li>
      <li
        :class="[
          'pagination-item',
          { 'disabled-item': currentPage >= totalPages },
        ]"
      >
        <button
          :disabled="currentPage >= totalPages"
          :class="['pagination-btn', 'pagination-arrow']"
          :tabindex="currentPage >= totalPages ? -1 : 0"
          @click="setPage(currentPage + 1)"
        >
          &gt;
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  import { computed, ref, watch, withDefaults } from 'vue';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';

  type Props = {
    totalItems: number;
    pageSize: number;
    pagesVisible: number;
    defaultPage?: number;
  };

  const store = useProjectsStore();
  const props = withDefaults(defineProps<Props>(), {
    defaultPage: 1,
  });

  const totalPages = computed(() =>
    Math.ceil(props.totalItems / props.pageSize),
  );
  const currentPage = ref(1);
  const startPage = ref(1);
  const endPage = ref(1);

  watch(() => store.filters.page, updatePages, { immediate: true });

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
  function updatePages(page?: number) {
    currentPage.value = page || props.defaultPage;

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

  function setPage(page: number) {
    store.setFilters({ page });
    store.updateFilters();
  }
</script>

<style scoped>
  .pagination {
    margin-top: 0.9375rem;
    margin-bottom: 0.9375rem;
    background: #ffffff;
    border-radius: 0.625rem;
    box-shadow: 0px 0px 0.3125rem rgba(0, 0, 0, 0.18);
  }

  .pagination-list {
    display: flex;
    gap: 2.25rem;
    justify-content: center;
    list-style: none;
  }

  .pagination-item {
    width: 2.5625rem;
    height: 3.3125rem;
  }

  .disabled-item {
    pointer-events: none;
    opacity: 0.4;
  }

  .pagination-btn {
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 1.25rem;
    color: var(--gray-color-2);
    cursor: pointer;
    background-color: transparent;
    border: none;
    border-bottom: 0.25rem solid transparent;
  }

  .pagination-btn:hover,
  .pagination-item.active .pagination-btn {
    border-bottom-color: var(--accent-color-2);
  }

  .pagination-arrow:hover {
    color: var(--accent-color-2);
    border-bottom-color: transparent;
  }
</style>
