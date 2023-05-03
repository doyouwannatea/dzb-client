import { UseQueryOptions, useQuery } from 'vue-query';
import { supervisorApi } from '@/api/SupervisorApi';
import SupervisorApiType from '@/api/SupervisorApi/SupervisorApiType';
import { DEFAULT_QUERY_STALE_TIME } from '@/api/baseKy';

type TQueryFnData = Awaited<ReturnType<SupervisorApiType['getThemeSources']>>;

export type UseGetThemeSourcesQueryOptions<T = TQueryFnData> = UseQueryOptions<
  TQueryFnData,
  unknown,
  T,
  typeof USE_GET_THEME_SOURCES_QUERY_KEY
>;

export const USE_GET_THEME_SOURCES_QUERY_KEY =
  'USE_GET_THEME_SOURCES_QUERY_KEY';

export const useGetThemeSourcesQuery = <T = TQueryFnData>(
  options?: UseGetThemeSourcesQueryOptions<T>,
) =>
  useQuery(
    USE_GET_THEME_SOURCES_QUERY_KEY,
    () => supervisorApi.getThemeSources(),
    {
      staleTime: DEFAULT_QUERY_STALE_TIME,
      ...options,
    },
  );
