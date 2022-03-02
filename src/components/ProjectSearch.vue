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
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { debounce } from 'lodash';
  import searchIconUrl from '@/assets/icons/search.svg?url';
  import { RouteNames } from '@/router/types/route-names';
  import { useProjectsStore } from '@/stores/projects';
  import BaseInput from './base/BaseInput.vue';

  const router = useRouter();
  const store = useProjectsStore();
  const term = ref(store.filters.title || '');

  watch(
    () => term.value,
    () => {
      setLoading();
      debouncedInput();
    },
  );

  const setLoading = () => (store.loading = true);

  function search() {
    term.value = term.value.trim();

    router.push({
      name: RouteNames.HOME,
      query: {
        ...router.currentRoute.value.query,
        page: 1,
        title: term.value,
      },
      force: true,
    });
  }

  const debouncedInput = debounce(search, 600);
  const debouncedSubmit = debounce(search, 50);
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
