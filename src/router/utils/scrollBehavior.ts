import { RouterScrollBehavior } from 'vue-router';

export const scrollBehavior: RouterScrollBehavior = (
  to,
  from,
  savedPosition,
) => {
  if (savedPosition) {
    return savedPosition;
  }
  if (to.hash) {
    return { el: to.hash };
  }
  return { top: 0 };
};
