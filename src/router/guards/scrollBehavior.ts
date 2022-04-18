import { RouterScrollBehavior } from 'vue-router';

export const scrollBehavior: RouterScrollBehavior = (
  to,
  from,
  savedPosition,
) => {
  if (savedPosition) {
    return savedPosition;
  }
  return { top: 0 };
};
