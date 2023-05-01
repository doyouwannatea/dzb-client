import { UseQueryOptions, useQuery } from 'vue-query';
import { projectApi } from '@/api/ProjectApi';
import IProjectApi from '@/api/ProjectApi/IProjectApi';

type TQueryFnData = Awaited<ReturnType<IProjectApi['getAllSupervisors']>>;

export type UseGetAllSupervisorsQueryOptions<T = TQueryFnData> =
  UseQueryOptions<
    TQueryFnData,
    unknown,
    T,
    typeof USE_GET_ALL_SUPERVISORS_QUERY_KEY
  >;

export const USE_GET_ALL_SUPERVISORS_QUERY_KEY =
  'USE_GET_ALL_SUPERVISORS_QUERY_KEY';

export const useGetAllSupervisorsQuery = <T = TQueryFnData>(
  options?: UseGetAllSupervisorsQueryOptions<T>,
) =>
  useQuery(USE_GET_ALL_SUPERVISORS_QUERY_KEY, projectApi.getAllSupervisors, {
    staleTime: Infinity,
    placeholderData: () => [],
    ...options,
  });
