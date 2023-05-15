import { UseQueryOptions, useQuery } from 'vue-query';
import { projectApi } from '@/api/ProjectApi';
import ProjectApiType from '@/api/ProjectApi/ProjectApiType';
import { Skill } from '@/models/Project';
import { DEFAULT_QUERY_STALE_TIME } from '@/api/baseKy';

type TQueryFnData = Awaited<ReturnType<ProjectApiType['getAllProjectTags']>>;

export type UseGetAllProjectTagsQueryOptions<T = TQueryFnData> =
  UseQueryOptions<
    TQueryFnData,
    unknown,
    T,
    typeof USE_GET_ALL_PROJECT_TAGS_QUERY_KEY
  >;

export const USE_GET_ALL_PROJECT_TAGS_QUERY_KEY =
  'USE_GET_ALL_PROJECT_TAGS_QUERY_KEY';

export const useGetAllProjectTagsQuery = <T = TQueryFnData>(
  options?: UseGetAllProjectTagsQueryOptions<T>,
) =>
  useQuery(
    USE_GET_ALL_PROJECT_TAGS_QUERY_KEY,
    () => projectApi.getAllProjectTags(),
    {
      staleTime: DEFAULT_QUERY_STALE_TIME,
      ...options,
    },
  );

export const useGetProjectSkillsQuery = (
  options?: UseGetAllProjectTagsQueryOptions<Skill[]>,
) => useGetAllProjectTagsQuery({ select: (tags) => tags.skills, ...options });
