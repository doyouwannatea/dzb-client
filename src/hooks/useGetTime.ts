import { onBeforeMount } from 'vue';
import { useParticipationsStore } from '@/stores/participations/useParticipationsStore';

export const useGetParticipationTime = () => {
  const participationsStore = useParticipationsStore();
  onBeforeMount(() => participationsStore.getParticipationTime());
};

export const useGetProjectTime = () => {
  const participationsStore = useParticipationsStore();
  onBeforeMount(() => participationsStore.getProjectTime());
};
