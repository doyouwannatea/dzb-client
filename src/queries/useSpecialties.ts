import { projectCreationApi } from '@/api/ProjectCreationApi';
import { useQuery } from 'vue-query';

export const useSpecialtiesKey = 'useSpecialtiesKey';
export const useSpecialties = () =>
  useQuery(useSpecialtiesKey, projectCreationApi.getSpecialties, {
    staleTime: Infinity,
  });
