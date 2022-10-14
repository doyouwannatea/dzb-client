import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const COOKIE_KEY = 'saved-route';

export const useSavedRoute = () => {
  const router = useRouter();
  onBeforeMount(() => {
    const savedRoute = Cookies.get(COOKIE_KEY);
    if (savedRoute) {
      router.replace(savedRoute);
      Cookies.remove(COOKIE_KEY);
    }
  });
};

export const useSaveCurrentRoute = (route: string) => {
  Cookies.set(COOKIE_KEY, route);
};
