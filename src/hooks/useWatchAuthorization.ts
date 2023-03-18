import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { RouteNames } from '@/router/types/route-names';
import { useAuthStore } from '@/stores/auth/useAuthStore';

export const useWatchAuthorization = () => {
  const router = useRouter();
  const authStore = useAuthStore();

  watch(
    () => authStore.profileData,
    (isAuth) => {
      if (!isAuth) {
        router.replace({
          name: RouteNames.HOME,
        });
      }
    },
  );
};
