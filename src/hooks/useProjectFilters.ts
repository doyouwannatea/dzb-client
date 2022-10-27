import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import _ from 'lodash';
import { locationQueryToProjectFilters } from '@/helpers/query';
import { useProjectsStore } from '@/stores/projects/useProjectsStore';
import { ProjectFilters } from '@/models/Project';

export const useFilteredProjectList = () => {
  const router = useRouter();
  const route = useRoute();
  const projectStore = useProjectsStore();

  watch(
    () => route.query,
    (query, prevQuery) => {
      if (_.isEqual(query, prevQuery)) return;
      const storedFilters = projectStore.filters;
      const queryFilters = locationQueryToProjectFilters(query);

      const isEqual = _.isEqual(storedFilters, queryFilters);
      const storedFiltersNotEmpty = Object.values(storedFilters).some(
        (filter) => filter !== undefined,
      );

      if (!isEqual && storedFiltersNotEmpty) {
        return router.replace({ ...route, query: storedFilters });
      }

      projectStore.setFilters(queryFilters);
      projectStore.getProjectList();
    },
    { immediate: true },
  );
};

export const useProjectFilters = () => {
  const projectsStore = useProjectsStore();

  const filters = ref<ProjectFilters>({
    difficulty: [],
    state: [],
    skills: [],
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
