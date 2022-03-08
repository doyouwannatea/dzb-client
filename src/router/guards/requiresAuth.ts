import { NavigationGuard } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { RouteNames } from '../types/route-names';

export const requiresAuth: NavigationGuard = (to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuth) {
    authStore.authModalShow = true;
    return next({
      name: RouteNames.HOME,
    });
  }
  return next();
};
