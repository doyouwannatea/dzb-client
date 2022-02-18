<template>
  <form class="search-form" @submit.prevent="debouncedSubmit">
    <input
      v-model="term"
      class="input search-input"
      type="text"
      name="search"
      placeholder="Введите название проекта для поиска..."
      @input="
        debouncedInput();
        setLoading();
      "
    />
  </form>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { debounce } from 'lodash';
  import { RouteNames } from '@/router/types/route-names';
  import { useProjectsStore } from '@/stores/projects';

  const router = useRouter();
  const store = useProjectsStore();
  const term = ref('');

  watch(
    () => store.filters.title,
    (title) => {
      term.value = title || '';
    },
    { immediate: true },
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
    padding-right: 4.25rem;
    background: url('../assets/icons/search.svg') calc(100% - 1.0625rem) center /
      2.125rem no-repeat #ffffff;
    line-height: 1.4375rem;
    font-weight: 400;
  }
</style>
