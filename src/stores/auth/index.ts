import { defineStore } from 'pinia';
import CampusAuthApi from '@/api/CampusAuthApi';
import { state } from './state';

export const useAuthStore = defineStore('auth', {
  state,
  actions: {
    async auth() {
      try {
        this.isAuth = false;
        this.loading = true;
        this.error = '';
        await CampusAuthApi.auth();
        this.userData = await CampusAuthApi.getStudentInfo();
        this.isAuth = true;
      } catch (error) {
        this.error = String(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
