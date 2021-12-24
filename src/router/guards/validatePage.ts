import { NavigationGuard } from 'vue-router';
import { RouteNames } from '../types/route-names';

export const validatePage: NavigationGuard = (to, from, next) => {
  const page = Number(to.query.page);

  if (!page || isNaN(page) || page < 1) {
    return next({
      name: to.name || RouteNames.HOME,
      query: { ...from.query, page: 1 },
    });
  }
  return next();
};
