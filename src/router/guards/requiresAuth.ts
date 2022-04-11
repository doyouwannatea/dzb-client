import { NavigationGuard } from 'vue-router';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { RouteNames } from '../types/route-names';
import { useModalsStore } from '@/stores/modals/useModalsStore';

export const requiresAuth: NavigationGuard = (to, from, next) => {
  const authStore = useAuthStore();
  const modalsStore = useModalsStore();

  if (to.meta.requiresAuth && !authStore.isAuth) {
    modalsStore.authModal = true;
    return next({
      name: RouteNames.HOME,
    });
  }
  return next();
};
