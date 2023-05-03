import { UseQueryOptions, useQuery } from 'vue-query';
import { projectApi } from '@/api/ProjectApi';
import ProjectApiType from '@/api/ProjectApi/ProjectApiType';
import { DEFAULT_QUERY_STALE_TIME } from '@/api/baseKy';

type TQueryFnData = Awaited<ReturnType<ProjectApiType['getAllProjectTypes']>>;

export type UseGetAllProjectTypesQueryOptions<T = TQueryFnData> =
  UseQueryOptions<
    TQueryFnData,
    unknown,
    T,
    typeof USE_GET_ALL_PROJECT_TYPES_QUERY_KEY
  >;

export const USE_GET_ALL_PROJECT_TYPES_QUERY_KEY =
  'USE_GET_ALL_PROJECT_TYPES_QUERY_KEY';

export const useGetAllProjectTypesQuery = <T = TQueryFnData>(
  options?: UseGetAllProjectTypesQueryOptions<T>,
) =>
  useQuery(
    USE_GET_ALL_PROJECT_TYPES_QUERY_KEY,
    () => projectApi.getAllProjectTypes(),
    {
      staleTime: DEFAULT_QUERY_STALE_TIME,
      ...options,
    },
  );
