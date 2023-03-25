import { projectApi } from '@/api/ProjectApi';
import { useQuery } from 'vue-query';

export const useProjectSkillsKey = 'useProjectSkillsKey';
export const useProjectSkills = () =>
  useQuery(useProjectSkillsKey, projectApi.getAllProjectTags, {
    staleTime: Infinity,
    select: (data) => data.skills,
  });
