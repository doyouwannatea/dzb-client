import { storeToRefs } from 'pinia';
import { ComputedRef, computed } from 'vue';
import { useGetParticipationsTimeQuery } from '@/api/CandidateApi/hooks/useGetParticipationsTimeQuery';
import { useGetProposalsTimeQuery } from '@/api/SupervisorApi/hooks/useGetProposalsTimeQuery';
import { useAuthStore } from '@/stores/auth/useAuthStore';

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
