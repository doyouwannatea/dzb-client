import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { isEqual } from 'lodash';
import { decodeFiltersFromQueries } from '@/helpers/query';
import { RouteNames } from '@/router/types/route-names';
import { useProjectsStore } from '@/stores/projects';

export const useUpdateProjectList = () => {
  const route = useRoute();
  const store = useProjectsStore();

  watch(
    () => route.query,
    (query) => {
      if (route.name !== RouteNames.HOME) return;
      const filters = decodeFiltersFromQueries(query);
      const filtersChanged = !isEqual(filters, store.filters);

      if (filtersChanged || !store.projectList) {
        store.setFilters(filters);
        store.getProjectList();
      } else {
        // если какой то элемент преждевременно запустил загрузку
        // но в итоге фильтры не поменялись
        // то тут загрузку и отменяем
        store.loading = false;
      }
    },
    { immediate: true },
  );
};
