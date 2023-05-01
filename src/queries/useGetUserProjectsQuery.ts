import { UseQueryOptions, useQuery } from 'vue-query';
import { projectApi } from '@/api/ProjectApi';
import { projectCreationApi } from '@/api/ProjectCreationApi';
import { isCandidate, isSupervisor } from '@/helpers/typeCheck';
import { Project } from '@/models/Project';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { AUTH_REQUIRED } from '@/values/error-messages';

type TQueryFnData = Project[];

export type UseGetUserProjectsQueryOptions<T = TQueryFnData> = UseQueryOptions<
  TQueryFnData,
  unknown,
  T,
  typeof USE_GET_USER_PROJECTS_QUERY_KEY
>;

export const USE_GET_USER_PROJECTS_QUERY_KEY =
  'USE_GET_USER_PROJECTS_QUERY_KEY';

export const useGetUserProjectsQuery = <T = TQueryFnData>(
  options?: UseGetUserProjectsQueryOptions<T>,
) => {
  const authStore = useAuthStore();
  const profileData = authStore.profileData;

  return useQuery(
    USE_GET_USER_PROJECTS_QUERY_KEY,
    async () => {
      if (!profileData) throw new Error(AUTH_REQUIRED);

      if (isSupervisor(profileData)) {
        return projectCreationApi.getSupervisorProjectList();
      }

      if (isCandidate(profileData)) {
        const candidateProjectList: Project[] = [];
        const [activeProject, arhiveProjects] = await Promise.all([
          projectApi.getActiveUserProject(),
          projectApi.getArhiveUserProjects(),
        ]);
        if (activeProject) candidateProjectList.push(activeProject);
        candidateProjectList.push(...arhiveProjects);
        return candidateProjectList;
      }

      return [];
    },
    { ...options },
  );
};
