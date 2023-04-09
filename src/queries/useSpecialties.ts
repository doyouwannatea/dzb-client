import { projectCreationApi } from '@/api/ProjectCreationApi';
import { Specialty } from '@/models/Specialty';
import { UseQueryOptions, useQuery } from 'vue-query';

export const useSpecialtiesKey = 'useSpecialtiesKey';
export const useSpecialties = <T = Specialty<number>[]>(
  options?: UseQueryOptions<
    Specialty<number>[],
    unknown,
    T,
    typeof useSpecialtiesKey
  >,
) =>
  useQuery(useSpecialtiesKey, projectCreationApi.getSpecialties, {
    staleTime: Infinity,
    ...options,
  });
