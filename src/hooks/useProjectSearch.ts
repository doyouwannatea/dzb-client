import { debounce } from 'lodash';
import { ref, watch } from 'vue';
import { useProjectsStore } from '@/stores/projects/useProjectsStore';

type Options = {
  triggerOnInput: boolean;
};

export const useProjectSearch = ({ triggerOnInput }: Options) => {
  const store = useProjectsStore();
  const term = ref('');
  const inputRef = ref<HTMLInputElement | null>(null);
  const isClearFilters = ref<boolean>(false);

  watch(
    () => store.filters.title,
    (title) => {
      if (!title) isClearFilters.value = true;
      term.value = title || '';
    },
    { immediate: true },
  );

  watch(
    () => term.value,
    () => {
      if (!triggerOnInput) return;
      if (isClearFilters.value) {
        isClearFilters.value = false;
        return;
      }
      debouncedInput();
    },
  );

  function search() {
    term.value = term.value.trim();

    store.setFilters({ title: term.value, page: 1 });
    store.updateFilters();
  }

  function submitSearch() {
    inputRef.value?.blur();
    search();
  }

  const debouncedInput = debounce(search, 600);
  const debouncedSubmit = debounce(submitSearch, 50);

  return {
    term,
    debouncedInput,
    debouncedSubmit,
    getInputRef: () => inputRef,
  };
};
