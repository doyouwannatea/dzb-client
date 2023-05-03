import { UseQueryOptions, useQuery } from 'vue-query';
import { projectApi } from '@/api/ProjectApi';
import ProjectApiType from '@/api/ProjectApi/ProjectApiType';

type TQueryFnData = Awaited<ReturnType<ProjectApiType['getAllProjectStates']>>;

export type UseGetAllProjectStatesQueryOptions<T = TQueryFnData> =
  UseQueryOptions<
    TQueryFnData,
    unknown,
    T,
    typeof USE_GET_ALL_PROJECT_STATES_QUERY_KEY
  >;

export const USE_GET_ALL_PROJECT_STATES_QUERY_KEY =
  'USE_GET_ALL_PROJECT_STATES_QUERY_KEY';

export const useGetAllProjectStatesQuery = <T = TQueryFnData>(
  options?: UseGetAllProjectStatesQueryOptions<T>,
) =>
  useQuery(
    USE_GET_ALL_PROJECT_STATES_QUERY_KEY,
    () => projectApi.getAllProjectStates(),
    {
      staleTime: Infinity,
      ...options,
    },
  );
