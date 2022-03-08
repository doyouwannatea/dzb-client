import { defineStore } from 'pinia';
import CampusAuthApi from '@/api/CampusAuthApi';
import { state } from './state';

export const useAuthStore = defineStore('auth', {
  state,
  actions: {
    async auth() {
      try {
        this.loading = true;
        this.error = '';
        await CampusAuthApi.auth();
        this.profileData = await CampusAuthApi.getStudentInfo();
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
  persist: true,
});
