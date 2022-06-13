import { onBeforeMount } from 'vue';
import { useRouter, RouteLocationNormalizedLoaded, Router } from 'vue-router';
import Cookies from 'js-cookie';

const COOKIE_KEY = 'saved-route';

export const useSavedRoute = () => {
  const router = useRouter();

  onBeforeMount(() => {
    const savedRoute = Cookies.get(COOKIE_KEY);
    if (savedRoute) {
      const route: RouteLocationNormalizedLoaded = JSON.parse(savedRoute);
      router.replace(route);
      Cookies.remove(COOKIE_KEY);
    }
  });
};

export const useSaveCurrentRoute = (router?: Router) => {
  const hookRouter = useRouter();

  const currentRoute = router
    ? router.currentRoute.value
    : hookRouter.currentRoute.value;
  Cookies.set(COOKIE_KEY, JSON.stringify(currentRoute));
};
