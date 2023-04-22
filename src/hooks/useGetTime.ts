import { onBeforeMount } from 'vue';
import { useParticipationsStore } from '@/stores/participations/useParticipationsStore';

export const useGetCandidateParticipationTime = () => {
  const participationsStore = useParticipationsStore();
  onBeforeMount(() => participationsStore.getCandidateParticipationTime());
};

export const useGetSupervisorParticipationTime = () => {
  const participationsStore = useParticipationsStore();
  onBeforeMount(() => participationsStore.getSupervisorParticipationTime());
};
