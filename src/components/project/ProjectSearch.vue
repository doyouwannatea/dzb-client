<template>
  <form class="search-form" @submit.prevent="debouncedSubmit">
    <BaseInput
      v-model="term"
      :input-ref="getInputRef()"
      :icon="searchIconUrl"
      placeholder="Поиск по проектам..."
      class="search-input"
      type="text"
      inputmode="email"
      maxlength="100"
    />
    <transition name="loading">
      <div
        v-if="loadingProgress > 0"
        class="loading"
        :style="{
          width: `calc(${loadingProgress * 100}% - 2px)`,
        }"
      ></div>
    </transition>
  </form>
</template>

<script setup lang="ts">
  import searchIconUrl from '@/assets/icons/search.svg?url';
  import { useProjectSearch } from '@/hooks/useProjectSearch';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  // components
  import BaseInput from '../ui/BaseInput.vue';
  import { storeToRefs } from 'pinia';

  const projectStore = useProjectsStore();
  const { loadingProgress } = storeToRefs(projectStore);
  const { debouncedSubmit, term, getInputRef } = useProjectSearch({
    triggerOnInput: true,
  });
</script>

<style scoped>
  .search-form {
    position: relative;
    width: 100%;
    max-width: 43.375rem;
  }

  .search-input {
    height: 3.5625rem;
    padding-left: 1.0625rem;
    font-weight: 400;
  }

  .loading {
    position: absolute;
    bottom: 1px;
    left: 1px;
    height: 0.265rem;
    background-color: var(--green-color-1);
    border-radius: 0 0.3125rem 0.3125rem;
    transition: opacity 0.2s ease-in, transform 0.2s ease-in;
    transition-delay: 0.1s;
    transform-origin: right;
  }

  .loading-enter-active {
    border-radius: 0 0.3125rem 0.3125rem;
    transform: scaleX(1);
  }

  .loading-leave-active {
    border-radius: 0.3125rem;
    transition: opacity 0.7s ease-in, transform 0.7s ease-in;
    transition-delay: 0.4s;
    transform: scaleX(0);
  }

  .loading-enter-from,
  .loading-leave-to {
    opacity: 0;
  }
</style>
