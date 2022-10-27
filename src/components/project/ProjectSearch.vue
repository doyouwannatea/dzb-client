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
        v-if="loading"
        class="loading"
        :style="{
          width: `calc(${progress * 100}% - 2px)`,
        }"
      ></div>
    </transition>
  </form>
</template>

<script setup lang="ts">
  import searchIconUrl from '@/assets/icons/search.svg?url';
  import { computed } from 'vue';
  import { useProjectSearch } from '@/hooks/useProjectSearch';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  // components
  import BaseInput from '../ui/BaseInput.vue';

  const useProjectStore = useProjectsStore();
  const loading = computed(() => useProjectStore.loading);
  const { debouncedSubmit, term, getInputRef } = useProjectSearch({
    triggerOnInput: true,
  });
  const progress = computed(() => useProjectStore.progress);
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
    padding-left: 1.0625rem;
    background-color: #26ab5b;
    border-radius: 0 0.3125rem 0.3125rem 0.3125rem;
    transition: 0.2s ease-in;
  }

  .loading-enter-active {
    border-radius: 0 0.3125rem 0.3125rem 0.3125rem;
    transition: 0;
    transform: scaleX(1);
  }
  .loading-leave-active {
    border-radius: 0.3125rem 0.3125rem 0.3125rem 0.3125rem;
    transition: 1s ease-in-out;
    transform: scaleX(0);
  }

  .loading-enter-from,
  .loading-leave-to {
    opacity: 0%;
  }
</style>
