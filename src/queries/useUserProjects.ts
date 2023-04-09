import { projectApi } from '@/api/ProjectApi';
import { Project } from '@/models/Project';
import { UseQueryOptions, useQuery } from 'vue-query';

// TODO: переименовать ключи для queries
// TODO: useUserProjects возвращает проекты только для студентов, для преподавателей есть useProjectProposalList
export const useUserProjectsKey = 'useUserProjectsKey';
export const useUserProjects = <T = Project[]>(
  options?: UseQueryOptions<Project[], unknown, T, typeof useUserProjectsKey>,
) =>
  useQuery(
    useUserProjectsKey,
    async () => {
      const [activeProject, arhiveProjects] = await Promise.all([
        projectApi.getActiveUserProject(),
        projectApi.getArhiveUserProjects(),
      ]);
      const userProjectList: Project[] = [];
      if (activeProject) userProjectList.push(activeProject);
      userProjectList.push(...arhiveProjects);
      return userProjectList;
    },
    { staleTime: Infinity, ...options },
  );
