import { useStore } from '@/store/store';
import { ActionTypes } from '@/store/types/action-types';
import { NavigationGuard } from 'vue-router';

export const updateProjectPage: NavigationGuard = async (to, from, next) => {
  const store = useStore();
  const isPageChanged =
    to.params.page && Number(to.params.page) !== store.state.page;

  if (isPageChanged || !store.state.projectList) {
    store.dispatch(ActionTypes.FILTER_PROJECT_LIST, {
      page: Number(to.params.page),
    });
  }
  return next();
};
