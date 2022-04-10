import { ref, watch } from 'vue';
import { debounce } from 'lodash';
import { useProjectsStore } from '@/stores/projects/useProjectsStore';

type Options = {
  triggerOnInput: boolean;
};

export const useProjectSearch = ({ triggerOnInput }: Options) => {
  const store = useProjectsStore();
  const term = ref('');

  watch(
    () => store.filters.title,
    (title) => {
      term.value = title || '';
    },
    { immediate: true },
  );

  watch(
    () => term.value,
    () => {
      if (!triggerOnInput) return;
      debouncedInput();
    },
  );

  function search() {
    term.value = term.value.trim();

    store.setFilters({
      title: term.value,
      page: 1,
    });
    store.updateFilters();
  }

  const debouncedInput = debounce(search, 600);
  const debouncedSubmit = debounce(search, 50);

  return {
    term,
    debouncedInput,
    debouncedSubmit,
  };
};
