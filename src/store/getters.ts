import { ProjectFilters } from '@/api/ProjectApi/ProjectApiType';
import { compareArrays } from '@/helpers/array';
import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
  isPageChanged(state: State): (routerPage: string) => boolean;
  isFiltersChanged(state: State): (queryFilters: ProjectFilters) => boolean;
};

export const getters: GetterTree<State, State> & Getters = {
  isPageChanged: (state) => (routerPage) => {
    return Boolean(routerPage && Number(routerPage) !== state.filters.page);
  },
  isFiltersChanged: (state) => (queryFilters) => {
    const {
      date_end,
      date_start,
      difficulty,
      state: projectState,
      supervisor,
      tags,
      title,
      type,
    } = state.filters;
    return [
      queryFilters.title === title,
      queryFilters.date_end === date_end,
      queryFilters.date_start === date_start,
      compareArrays(queryFilters.difficulty, difficulty),
      compareArrays(queryFilters.state, projectState),
      compareArrays(queryFilters.supervisor, supervisor),
      compareArrays(queryFilters.tags, tags),
      compareArrays(queryFilters.type, type),
    ].some((val) => !val);
  },
};
