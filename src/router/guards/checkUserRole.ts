import { NavigationGuard } from 'vue-router';
import { useCheckRole } from '@/hooks/useCheckRole';
import { RouteNames } from '../types/route-names';

export const checkUserRole: NavigationGuard = (to, from, next) => {
  const role = to.meta.role;
  const isPass = useCheckRole(role);

  if (!role || isPass) {
    return next();
  }

  return next(
    from || {
      name: RouteNames.HOME,
    },
  );
};
