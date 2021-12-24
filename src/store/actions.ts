import { ActionContext, ActionTree } from 'vuex';
import { ActionTypes } from './types/action-types';
import { MutationTypes } from './types/mutation-types';
import { Mutations } from './mutations';
import { State } from './state';
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
}

export const actions: ActionTree<State, State> & Actions = {
  // GET_PROJECT_LIST
  async [ActionTypes.GET_PROJECT_LIST]({ commit, state }) {
    const filters = state.filters;
    commit(MutationTypes.SET_PROJECT_LIST, {
      projectCount: 0,
      projectList: null,
    });
    commit(MutationTypes.SET_LOADING, true);
    commit(MutationTypes.SET_ERROR, '');
    try {
      const { data, projectCount } = await ProjectApi.filterProjectList(
        filters,
      );
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
};
