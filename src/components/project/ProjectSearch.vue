<template>
  <form class="search-form" @submit.prevent="debouncedSubmit">
    <BaseInput
      v-model="term"
      :icon="searchIconUrl"
      placeholder="Введите название проекта для поиска..."
      class="search-input"
    />
  </form>
</template>

<script setup lang="ts">
  import searchIconUrl from '@/assets/icons/search.svg?url';
  import { useProjectSearch } from '@/hooks/useProjectSearch';
  // components
  import BaseInput from '../ui/BaseInput.vue';

  const { debouncedSubmit, term } = useProjectSearch({
    triggerOnInput: true,
  });
</script>

<style scoped>
  .search-form {
    width: 100%;
    max-width: 43.375rem;
  }

  .search-input {
    height: 3.5625rem;
    padding-left: 1.0625rem;
    font-weight: 400;
  }
</style>
