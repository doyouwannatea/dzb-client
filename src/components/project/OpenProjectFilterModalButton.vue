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
        d="M22.5404 3.87424H2.54037L10.5404 13.3342V19.8742L14.5404 21.8742V13.3342L22.5404 3.87424Z"
        stroke="#383838"
        stroke-width="1.99596"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    Фильтры
  </button>
</template>

<script setup lang="ts">
  import { useModalsStore } from '@/stores/modals/useModalsStore';

  const modalsStore = useModalsStore();
</script>

<style lang="scss" scoped>
  .open-project-filter-btn {
    font-family: 'Mont', Arial, Helvetica, sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
    border-radius: 0.3125rem;
    padding: 0.3em 0.5em;

    &:hover,
    &:focus-visible {
      background-color: rgba(0, 0, 0, 0.03);
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.05);
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
</style>
