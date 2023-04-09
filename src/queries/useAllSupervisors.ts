import { projectApi } from '@/api/ProjectApi';
import { Supervisor } from '@/models/Supervisor';
import { UseQueryOptions, useQuery } from 'vue-query';

export const useAllSupervisorsKey = 'useAllSupervisorsKey';
export const useAllSupervisors = <T = Supervisor[]>(
  options?: UseQueryOptions<
    Supervisor[],
    unknown,
    T,
    typeof useAllSupervisorsKey
  >,
) =>
  useQuery(useAllSupervisorsKey, projectApi.getAllSupervisors, {
    staleTime: Infinity,
    placeholderData: () => [],
    ...options,
  });
