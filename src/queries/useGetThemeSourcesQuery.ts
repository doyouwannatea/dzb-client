import { UseQueryOptions, useQuery } from 'vue-query';
import { projectCreationApi } from '@/api/ProjectCreationApi';
import IProjectCreationApi from '@/api/ProjectCreationApi/IProjectCreationApi';

type TQueryFnData = Awaited<ReturnType<IProjectCreationApi['getThemeSources']>>;

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
    projectCreationApi.getThemeSources,
    {
      staleTime: Infinity,
      ...options,
    },
  );
