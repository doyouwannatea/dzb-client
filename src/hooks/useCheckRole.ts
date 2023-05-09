import { UserRoleKey } from '@/models/User';
import { useAuthStore } from '@/stores/auth/useAuthStore';

export const useCheckRole = (roles: UserRoleKey[] = []): boolean => {
  const authStore = useAuthStore();
  for (const role of roles) {
    if (authStore.profileData?.[role] && roles?.includes(role)) return true;
  }
  return false;
};
