import { decodeFilterParams } from '@/helpers/query';
import { useStore } from '@/store/store';
import { ActionTypes } from '@/store/types/action-types';
import { MutationTypes } from '@/store/types/mutation-types';
import { NavigationGuard } from 'vue-router';

export const updateProjectPage: NavigationGuard = async (to, from, next) => {
  const store = useStore();
  const filters = decodeFilterParams(to.query);

  if (
    store.getters.isPageChanged(String(to.params.page)) ||
    store.getters.isFiltersChanged(filters) ||
    !store.state.projectList
  ) {
    store.commit(MutationTypes.SET_PAGE, Number(to.params.page));
    store.commit(MutationTypes.SET_FILTERS, filters);
    store.dispatch(ActionTypes.GET_PROJECT_LIST, undefined);
  }

  return next();
};
