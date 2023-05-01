import { UseQueryOptions, useQuery } from 'vue-query';
import { projectApi } from '@/api/ProjectApi';
import IProjectApi from '@/api/ProjectApi/IProjectApi';
import { Skill } from '@/models/Project';

type TQueryFnData = Awaited<ReturnType<IProjectApi['getAllProjectTags']>>;

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
  useQuery(USE_GET_ALL_PROJECT_TAGS_QUERY_KEY, projectApi.getAllProjectTags, {
    staleTime: Infinity,
    ...options,
  });

export const useGetProjectSkillsQuery = (
  options?: UseGetAllProjectTagsQueryOptions<Skill[]>,
) => useGetAllProjectTagsQuery({ select: (tags) => tags.skills, ...options });
