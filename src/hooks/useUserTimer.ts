import { computed, ComputedRef } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { useGetProposalsTimeQuery } from '@/api/SupervisorApi/hooks/useGetProposalsTimeQuery';
import { useGetParticipationsTimeQuery } from '@/api/CandidateApi/hooks/useGetParticipationsTimeQuery';

export function useUserTimer(): ComputedRef<string[] | undefined> {
  const authStore = useAuthStore();
  const { isStudent, isTeacher } = storeToRefs(authStore);

  const proposalsTimeQuery = useGetProposalsTimeQuery({ enabled: isTeacher });
  const participationsTimeQuery = useGetParticipationsTimeQuery({
    enabled: isStudent,
  });

  return computed(() => {
    if (isTeacher.value) return proposalsTimeQuery.data.value;
    if (isStudent.value) return participationsTimeQuery.data.value;
    return undefined;
  });
}
