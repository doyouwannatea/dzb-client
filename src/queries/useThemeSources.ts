import { projectCreationApi } from '@/api/ProjectCreationApi';
import { Tag } from '@/models/Tag';
import { UseQueryOptions, useQuery } from 'vue-query';

export const useThemeSourcesKey = 'useThemeSourcesKey';
export const useThemeSources = <T = Tag<number>[]>(
  options?: UseQueryOptions<
    Tag<number>[],
    unknown,
    T,
    typeof useThemeSourcesKey
  >,
) =>
  useQuery(useThemeSourcesKey, projectCreationApi.getThemeSources, {
    staleTime: Infinity,
    ...options,
  });
