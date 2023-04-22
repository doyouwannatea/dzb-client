import { useParticipationsStore } from '@/stores/participations/useParticipationsStore';
import { onBeforeMount } from 'vue';

export const useGetParticipationList = () => {
  const participationsStore = useParticipationsStore();
  onBeforeMount(() => participationsStore.getParticipationList());
};
