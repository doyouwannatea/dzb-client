import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { locationQueryToProjectFilters } from '@/helpers/query';
import { RouteNames } from '@/router/types/route-names';
import { useProjectsStore } from '@/stores/projects/useProjectsStore';
import { ProjectFilters } from '@/models/Project';

export const useFilteredProjectList = (page: RouteNames) => {
  const route = useRoute();
  const store = useProjectsStore();

  watch(
    () => route.query,
    (query) => {
      if (route.name !== page) return;
      const filters = locationQueryToProjectFilters(query);

      store.setFilters(filters);
      store.getProjectList();
    },
    { immediate: true },
  );
};

export const useProjectFilters = () => {
  const projectsStore = useProjectsStore();

  const filters = ref<ProjectFilters>({
    difficulty: [],
    state: [],
    tags: [],
    specialties: [],
  });

  // наблюдаем за состоянием хранилища
  // обновляем локальное состояние если что-то поменялось
  watch(
    () => projectsStore.filters,
    (storeFilters) => {
      filters.value = { ...storeFilters };
    },
    { immediate: true },
  );

  function filter() {
    projectsStore.setFilters({
      ...filters.value,
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
    filters,
  };
};
