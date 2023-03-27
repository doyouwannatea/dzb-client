import { projectApi } from '@/api/ProjectApi';
import { useQuery } from 'vue-query';

export const useAllSupervisorsKey = 'useAllSupervisorsKey';
export const useAllSupervisors = () =>
  useQuery(useAllSupervisorsKey, projectApi.getAllSupervisors, {
    staleTime: Infinity,
    placeholderData: () => [],
  });
