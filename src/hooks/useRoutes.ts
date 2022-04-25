import { useRouter } from 'vue-router';

export const useUserNavigationRoutes = () => {
  const router = useRouter();

  return router
    .getRoutes()
    .filter((route) => route.meta.type === 'user-nav')
    .sort((a, b) => (a.meta.order || 0) - (b.meta.order || 0));
};

export const useMainNavigationRoutes = () => {
  const router = useRouter();

  return router
    .getRoutes()
    .filter((route) => route.meta.type === 'main-nav')
    .sort((a, b) => (a.meta.order || 0) - (b.meta.order || 0));
};
