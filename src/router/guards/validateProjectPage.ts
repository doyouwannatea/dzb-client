import { NavigationGuard } from 'vue-router';
import { RouteNames } from '../types/route-names';

export const validateProjectPage: NavigationGuard = (to, from, next) => {
  const page = Number(to.params.page);
  if (isNaN(page) || page < 1) {
    return next({ name: RouteNames.HOME, params: { page: '1' } });
  }
  return next();
};
