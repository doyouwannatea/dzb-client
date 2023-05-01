import { UseQueryOptions, useQuery } from 'vue-query';
import { projectCreationApi } from '@/api/ProjectCreationApi';
import IProjectCreationApi from '@/api/ProjectCreationApi/IProjectCreationApi';
import { Specialty } from '@/models/Specialty';

type TQueryFnData = Awaited<ReturnType<IProjectCreationApi['getSpecialties']>>;

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
  useQuery(USE_GET_SPECIALTIES_QUERY_KEY, projectCreationApi.getSpecialties, {
    staleTime: Infinity,
    ...options,
  });
