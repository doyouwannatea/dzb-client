<template>
  <button
    class="open-project-filter-btn"
    @click="modalsStore.projectFilterModal = true"
  >
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
        stroke="#383838"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle
        v-if="!isEmptyFilters"
        class="active-indicator"
        cx="18.5"
        cy="4.5"
        r="3.5"
      />
    </svg>
    Фильтры
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { isEmptyObject } from '@/helpers/object';
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';

  const modalsStore = useModalsStore();
  const projectStore = useProjectsStore();

  const isEmptyFilters = computed(() => {
    const { order, page, title, sortBy, ...rest } = projectStore.filters;
    return isEmptyObject(rest as unknown as Record<string, unknown>);
  });
</script>

<style lang="scss" scoped>
  .open-project-filter-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.3em 0.5em;
    font-family: Mont, Arial, Helvetica, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    background-color: transparent;
    border: none;
    border-radius: 0.3125rem;

    &:hover,
    &:focus-visible {
      background-color: rgb(0 0 0 / 3%);
    }

    &:active {
      background-color: rgb(0 0 0 / 5%);
    }

    & > svg {
      min-width: 1.875rem;
      height: 1.875rem;
      margin-bottom: 0.3125rem;

      path {
        stroke: var(--text-color);
      }
    }
  }

  .active-indicator {
    fill: var(--accent-color-2);
  }
</style>
