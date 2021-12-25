import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { isEqual } from 'lodash';
import { decodeFiltersFromQueries } from '@/helpers/query';
import { useStore } from '@/store/store';
import { ActionTypes } from '@/store/types/action-types';
import { MutationTypes } from '@/store/types/mutation-types';
import { RouteNames } from '@/router/types/route-names';

export const useUpdateProjectList = () => {
  const route = useRoute();
  const store = useStore();

  watch(
    () => route.query,
    (query) => {
      if (route.name !== RouteNames.HOME) return;
      const filters = decodeFiltersFromQueries(query);
      const filtersChanged = !isEqual(filters, store.state.filters);

      if (filtersChanged || !store.state.projectList) {
        store.commit(MutationTypes.SET_FILTERS, filters);
        store.dispatch(ActionTypes.GET_PROJECT_LIST, undefined);
      } else {
        // если какой то элемент преждевременно запустил загрузку
        // но в итоге фильтры не поменялись
        // то тут загрузку и отменяем
        store.commit(MutationTypes.SET_LOADING, false);
      }
    },
    { immediate: true },
  );
};
