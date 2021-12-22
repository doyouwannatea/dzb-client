import { MutationTree } from 'vuex';
import { MutationTypes } from './types/mutation-types';
import { ProjectFilters, State } from './state';
import { Project } from '@/models/Project';
import { AllFilterOptions } from '@/hooks/useProjectFiltersOptions/types';

export type Mutations<S = State> = {
  [MutationTypes.SET_PROJECT_LIST](
    state: S,
    {
      projectList,
      projectCount,
    }: { projectList: Project[] | null; projectCount: number },
  ): void;
  [MutationTypes.SET_LOADING](state: S, loading: boolean): void;
  [MutationTypes.SET_ERROR](state: S, error: string): void;
  [MutationTypes.SET_PAGE](state: S, page?: number): void;
  [MutationTypes.SET_FILTERS](state: S, filters?: ProjectFilters): void;
  [MutationTypes.SET_FILTER_OPTIONS](state: S, options: AllFilterOptions): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_PROJECT_LIST](state, { projectList, projectCount }) {
    state.projectList = projectList;
    state.projectCount = projectCount;
  },
  [MutationTypes.SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [MutationTypes.SET_ERROR](state, error) {
    state.error = error;
  },
  [MutationTypes.SET_PAGE](state, page) {
    if (page) {
      state.page = page;
    }
  },
  [MutationTypes.SET_FILTERS](state, filters) {
    if (filters) {
      state.filters = { ...state.filters, ...filters };
    }
  },
  [MutationTypes.SET_FILTER_OPTIONS](state, options) {
    state.filterOptions = options;
  },
};
