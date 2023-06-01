import { useAuthStore } from '@/stores/auth/useAuthStore';
import { UserRoleKey } from '@/models/User';

export const useCheckRole = (roles: UserRoleKey[] = []): boolean => {
  const authStore = useAuthStore();
  for (const role of roles) {
    if (authStore.profileData?.[role] && roles?.includes(role)) return true;
  }
  return false;
};
