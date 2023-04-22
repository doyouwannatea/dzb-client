import { projectApi } from '@/api/ProjectApi';
import { projectCreationApi } from '@/api/ProjectCreationApi';
import { isCandidate, isSupervisor } from '@/helpers/typeCheck';
import { Project } from '@/models/Project';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { AUTH_REQUIRED } from '@/values/error-messages';
import { UseQueryOptions, useQuery } from 'vue-query';

// TODO: переименовать ключи для queries
export const useUserProjectsKey = 'useUserProjectsKey';
export const useUserProjects = <T = Project[]>(
  options?: UseQueryOptions<Project[], unknown, T, typeof useUserProjectsKey>,
) => {
  const authStore = useAuthStore();
  const profileData = authStore.profileData;

  return useQuery(
    useUserProjectsKey,
    async () => {
      if (!profileData) throw new Error(AUTH_REQUIRED);
      const userProjectList: Project[] = [];

      if (isSupervisor(profileData)) {
        const projectProposals =
          await projectCreationApi.getSupervisorProjectList();
        userProjectList.push(...projectProposals);
      } else if (isCandidate(profileData)) {
        const [activeProject, arhiveProjects] = await Promise.all([
          projectApi.getActiveUserProject(),
          projectApi.getArhiveUserProjects(),
        ]);
        if (activeProject) userProjectList.push(activeProject);
        userProjectList.push(...arhiveProjects);
      }
      return userProjectList;
    },
    { ...options },
  );
};
