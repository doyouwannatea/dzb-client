import { MutationTree } from 'vuex';
import { MutationTypes } from './types/mutation-types';
import { State } from './state';

export type Mutations<S = State> = {
  [MutationTypes.SET_COUNTER](state: S, payload: number): void;
  [MutationTypes.RESET_COUNTER](state: S): void;
  [MutationTypes.INC_COUNTER](state: S): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_COUNTER](state, payload: number) {
    state.count = payload;
  },
  [MutationTypes.RESET_COUNTER](state) {
    state.count = 0;
  },
  [MutationTypes.INC_COUNTER](state) {
    state.count += 1;
  },
};
