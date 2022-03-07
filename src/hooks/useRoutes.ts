import { useRouter } from 'vue-router';

export const useUserNavigationRoutes = () => {
  const router = useRouter();

  return router
    .getRoutes()
    .filter((route) => route.meta.type === 'user-nav')
    .sort((a, b) => (a.meta.index || 0) - (b.meta.index || 0));
};

export const useMainNavigationRoutes = () => {
  const router = useRouter();

  return router
    .getRoutes()
    .filter((route) => route.meta.type === 'main-nav')
    .sort((a, b) => (a.meta.index || 0) - (b.meta.index || 0));
};
