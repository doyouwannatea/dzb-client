import { onBeforeMount } from 'vue';
import { useParticipationsStore } from '@/stores/participations/useParticipationsStore';

export const useGetParticipationDeadline = () => {
  const participationsStore = useParticipationsStore();
  onBeforeMount(() => participationsStore.getParticipationDeadline());
};
