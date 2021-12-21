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
  import { ActionTypes } from '@/store/types/action-types';
  import { ref } from 'vue';
  const store = useStore();
  const term = ref(store.state.filters.title || '');

  function search() {
    const title = term.value.trim();
    store.dispatch(ActionTypes.FILTER_PROJECT_LIST, { filters: { title } });
  }

  const debouncedInput = _debounce(search, 600);
  const debouncedSubmit = _debounce(search, 150);
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
