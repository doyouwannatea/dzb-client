<template>
  <form class="search-form" @submit.prevent="debouncedSubmit">
    <input
      v-model="term"
      class="input search-input"
      type="text"
      name="search"
      placeholder="Введите название проекта для поиска..."
      @input="debouncedInput"
    />
  </form>
</template>

<script setup lang="ts">
  import _debounce from 'lodash.debounce';
  import { useStore } from '@/store/store';
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { RouteNames } from '@/router/types/route-names';
  const router = useRouter();
  const store = useStore();
  const term = ref('');

  watch(
    () => store.state.filters.title,
    (title) => {
      term.value = title || '';
    },
    { immediate: true },
  );

  function search() {
    const title = term.value.trim();
    router.push({
      name: RouteNames.HOME,
      query: {
        ...router.currentRoute.value.query,
        page: 1,
        title,
      },
    });
  }

  const debouncedInput = _debounce(search, 600);
  const debouncedSubmit = _debounce(search, 50);
</script>

<style scoped>
  .search-form {
    width: 100%;
    max-width: 694px;
  }

  .search-input {
    height: 57px;
    padding-left: 17px;
    padding-right: 68px;
    background: url('../assets/icons/search.svg') calc(100% - 17px) center /
      34px no-repeat #ffffff;
    line-height: 23px;
    font-weight: 400;
  }
</style>
