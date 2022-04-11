import { defineStore } from 'pinia';
import campusAuthApi from '@/api/CampusAuthApi';
import { state } from './state';
import { State } from './state';

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
    async createPatricipation(priority: number, projectId: number) {
      try {
        this.loading = true;
        this.error = '';
        await campusAuthApi.createProjectParticipation(priority, projectId);
        this.requestsList =
          await campusAuthApi.getCandidateParticipationsList();
        this.successParticipationCreate = true;
      } catch (error) {
        this.error = String(error);
      } finally {
        this.loading = false;
      }
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
      (ctx.store.$state as State).successParticipationCreate = false;
    },
  },
});
