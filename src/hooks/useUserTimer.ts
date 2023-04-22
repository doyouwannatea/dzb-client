import { computed, ComputedRef } from 'vue';
import { storeToRefs } from 'pinia';
import { isSupervisor, isCandidate } from '@/helpers/typeCheck';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { useParticipationsStore } from '@/stores/participations/useParticipationsStore';

export function useUserTimer(): ComputedRef<string[] | undefined> {
  const authStore = useAuthStore();
  const participationsStore = useParticipationsStore();
  const { profileData } = storeToRefs(authStore);
  const { participationTime, projectTime } = storeToRefs(participationsStore);

  return computed(() => {
    if (!profileData?.value) return undefined;
    if (isSupervisor(profileData.value)) return projectTime?.value;
    if (isCandidate(profileData.value)) return participationTime?.value;
    return undefined;
  });
}
