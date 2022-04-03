import { defineStore } from 'pinia';
import campusAuthApi from '@/api/CampusAuthApi';
import { state } from './state';
import { State } from '../auth/state';
import { Participation } from '@/models/Participation';

export const useAuthStore = defineStore('auth', {
  state,
  actions: {
    async auth() {
      try {
        this.loading = true;
        this.error = '';
        await campusAuthApi.auth();
        this.profileData = await campusAuthApi.getCandidateInfo();
        this.requestsList =
          await campusAuthApi.getCandidateParticipationsList();
      } catch (error) {
        this.error = String(error);
      } finally {
        this.loading = false;
      }
    },
    exit() {
      this.profileData = undefined;
    },
  },
  getters: {
    isAuth: (state) => {
      return Boolean(state.profileData);
    },
  },
  persist: {
    afterRestore(ctx) {
      (ctx.store.$state as State).loading = false;
    },
  },
});
