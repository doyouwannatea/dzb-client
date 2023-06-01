import { NavigationGuard } from 'vue-router';
import { authApi } from '@/api/AuthApi';
import { useAuthStore } from '@/stores/auth/useAuthStore';

export const fetchUserData: NavigationGuard = async (to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.profileData && !from.name) {
    try {
      authStore.profileData = await authApi.getUserInfo();
    } catch (error) {
      console.error(error);
    }
  }
  return next();
};
