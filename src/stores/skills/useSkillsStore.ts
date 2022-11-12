import { skillsApi } from '@/api/SkillsApi';
import { Tag } from '@/models/Project';
import { defineStore } from 'pinia';
import { useAuthStore } from '../auth/useAuthStore';
import { state } from './state';

export const useSkillsStore = defineStore('skills', {
  state,
  actions: {
    // GET USER SKILLS
    getUserSkills() {
      return this._onAsync(async () => {
        this.userSkills = await skillsApi.getUserSkills();
      });
    },
    // GET USER SKILLS

    // UPDATE USER SKILLS
    updateUserSkills(skills: Tag[]) {
      const authStore = useAuthStore();

      return this._onAsync(async () => {
        await skillsApi.updateUserSkills(skills);
        await this.getUserSkills();
        await authStore.fetchUserData();
      });
    },
    // GET USER SKILLS

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
});
