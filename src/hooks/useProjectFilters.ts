import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { decodeFiltersFromQueries } from '@/helpers/query';
import { toJSONLocal } from '@/helpers/string';
import { RouteNames } from '@/router/types/route-names';
import { useProjectsStore } from '@/stores/projects';

export const useFilteredProjectList = (page: RouteNames) => {
  const route = useRoute();
  const store = useProjectsStore();

  watch(
    () => route.query,
    (query) => {
      if (route.name !== page) return;
      const filters = decodeFiltersFromQueries(query);

      store.setFilters(filters);
      store.getProjectList();
    },
    { immediate: true },
  );
};

export const useProjectFilters = () => {
  const projectsStore = useProjectsStore();

  const tags = ref<number[]>([]);
  const supervisors = ref<number[]>([]);
  const type = ref<number>(0);
  const states = ref<number[]>([]);
  const difficulty = ref<string[]>([]);
  const dateStart = ref<string | undefined>(undefined);
  const dateEnd = ref<string | undefined>(undefined);

  // наблюдаем за состоянием хранилища
  // обновляем локальное состояние если что-то поменялось
  watch(
    () => projectsStore.filters,
    (filters) => {
      tags.value = filters.tags || [];
      supervisors.value = filters.supervisor || [];
      type.value = filters.type ? filters.type[0] : 0;
      states.value = filters.state || [];
      difficulty.value = filters.difficulty?.map(String) || [];
      dateStart.value = filters.date_start
        ? toJSONLocal(new Date(filters.date_start))
        : undefined;
      dateEnd.value = filters.date_end
        ? toJSONLocal(new Date(filters.date_end))
        : undefined;
    },
    { immediate: true },
  );

  function filter() {
    projectsStore.setFilters({
      tags: tags.value,
      difficulty: difficulty.value.map(Number),
      state: states.value,
      supervisor: supervisors.value,
      type: type.value ? [type.value] : [],
      date_end: dateEnd.value,
      date_start: dateStart.value,
      page: 1,
    });
    projectsStore.updateFilters();
  }

  function clearFilter() {
    projectsStore.clearFilters();
    projectsStore.updateFilters();
  }

  return {
    filter,
    clearFilter,
    tags,
    supervisors,
    type,
    states,
    difficulty,
    dateStart,
    dateEnd,
  };
};