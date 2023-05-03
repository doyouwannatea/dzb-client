import { defineStore } from 'pinia';
import { state } from './state';

export const useAuthStore = defineStore('auth', {
  state,
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
