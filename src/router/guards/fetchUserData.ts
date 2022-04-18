import { NavigationGuard } from 'vue-router';
import { useAuthStore } from '@/stores/auth/useAuthStore';

export const fetchUserData: NavigationGuard = async (to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.isAuth && !from.name) {
    await authStore.fetchUserData();
  }
  return next();
};
