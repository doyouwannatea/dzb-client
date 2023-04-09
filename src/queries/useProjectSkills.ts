import { projectApi } from '@/api/ProjectApi';
import { ProjectTags, Skill } from '@/models/Project';
import { UseQueryOptions, useQuery } from 'vue-query';

export const useAllProjectTagsKey = 'useAllProjectTagsKey';
export const useAllProjectTags = <T = ProjectTags>(
  options?: UseQueryOptions<
    ProjectTags,
    unknown,
    T,
    typeof useAllProjectTagsKey
  >,
) =>
  useQuery(useAllProjectTagsKey, projectApi.getAllProjectTags, {
    staleTime: Infinity,
    ...options,
  });

export const useProjectSkills = (
  options?: UseQueryOptions<
    ProjectTags,
    unknown,
    Skill[],
    typeof useAllProjectTagsKey
  >,
) => useAllProjectTags({ select: (tags) => tags.skills, ...options });
