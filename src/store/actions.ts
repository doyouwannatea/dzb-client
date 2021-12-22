import { ActionContext, ActionTree } from 'vuex';
import { ActionTypes } from './types/action-types';
import { MutationTypes } from './types/mutation-types';
import { Mutations } from './mutations';
import { ProjectFilters, State } from './state';
import ProjectApi from '@/api/ProjectApi';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
  // GET_PROJECT_LIST
  [ActionTypes.GET_PROJECT_LIST]({ commit }: AugmentedActionContext): void;
  // FILTER_PROJECT_LIST
  [ActionTypes.FILTER_PROJECT_LIST](
    { commit }: AugmentedActionContext,
    { page }: { page?: number; filters?: ProjectFilters },
  ): void;
}

export const actions: ActionTree<State, State> & Actions = {
  // GET_PROJECT_LIST
  async [ActionTypes.GET_PROJECT_LIST]({ commit, state }) {
    const filters = state.filters;
    const page = state.page;
    commit(MutationTypes.SET_PROJECT_LIST, {
      projectCount: 0,
      projectList: null,
    });
    commit(MutationTypes.SET_LOADING, true);
    commit(MutationTypes.SET_ERROR, '');
    try {
      const { data, projectCount } = await ProjectApi.filterProjectList({
        ...filters,
        page,
      });
      commit(MutationTypes.SET_PROJECT_LIST, {
        projectList: data,
        projectCount,
      });
    } catch (error) {
      commit(MutationTypes.SET_ERROR, String(error));
    } finally {
      commit(MutationTypes.SET_LOADING, false);
    }
  },
  // FILTER_PROJECT_LIST
  async [ActionTypes.FILTER_PROJECT_LIST](
    { commit, dispatch },
    { page, filters },
  ) {
    commit(MutationTypes.SET_FILTERS, filters);
    commit(MutationTypes.SET_PAGE, page);
    await dispatch(ActionTypes.GET_PROJECT_LIST);
  },
};
