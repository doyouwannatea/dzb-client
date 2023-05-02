import { UseQueryOptions, useQuery } from 'vue-query';
import SupervisorApiType from '@/api/SupervisorApi/SupervisorApiType';
import { supervisorApi } from '@/api/SupervisorApi';

type TQueryFnData = Awaited<ReturnType<SupervisorApiType['getSpecialties']>>;

export type useGetSpecialtiesQueryOptions<T = TQueryFnData> = UseQueryOptions<
  TQueryFnData,
  unknown,
  T,
  typeof USE_GET_SPECIALTIES_QUERY_KEY
>;

export const USE_GET_SPECIALTIES_QUERY_KEY = 'USE_GET_SPECIALTIES_QUERY_KEY';

export const useGetSpecialtiesQuery = <T = TQueryFnData>(
  options?: useGetSpecialtiesQueryOptions<T>,
) =>
  useQuery(USE_GET_SPECIALTIES_QUERY_KEY, supervisorApi.getSpecialties, {
    staleTime: Infinity,
    ...options,
  });
