import { defineStore } from 'pinia';
import { state } from './state';
import { authApi } from '@/api/AuthApi';
import { useProjectsStore } from '../projects/useProjectsStore';
import { RouteNames } from '@/router/types/route-names';
import { useSaveCurrentRoute } from '@/hooks/useSaveRoute';

export const useAuthStore = defineStore('auth', {
  state,
  actions: {
    // AUTH
    auth() {
      return this._onAsync(async () => {
        useSaveCurrentRoute(this.$router.currentRoute.value.fullPath);
        await authApi.auth();
      });
    },
    // AUTH

    // EXIT
    async exit() {
      const projectStore = useProjectsStore();

      await authApi.logout();
      this.$router.replace({ name: RouteNames.HOME });
      this.profileData = undefined;
      await projectStore.getAddProjectData();
    },
    // EXIT

    // FETCH USER DATA
    fetchUserData() {
      return this._onAsync(async () => {
        this.profileData = await authApi.getUserInfo();
      });
    },
    // FETCH USER DATA

    // ON ASYNC
    async _onAsync<T>(callback: () => Promise<T>) {
      this.loading = true;
      this.error = '';
      try {
        return await callback();
      } catch (error) {
        this.error = String(error);
      } finally {
        this.loading = false;
      }
    },
    // ON ASYNC
  },
  getters: {
    isInstDirector(): boolean {
      return Boolean(this.profileData?.is_institute_director);
    },
    isTeacher(): boolean {
      return Boolean(this.profileData?.is_teacher);
    },
    isStudent(): boolean {
      return Boolean(this.profileData?.is_student);
    },
  },
});
