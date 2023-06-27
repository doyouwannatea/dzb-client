import { UseQueryOptions, useQuery } from 'vue-query';
import { candidateApi } from '@/api/CandidateApi';
import { supervisorApi } from '@/api/SupervisorApi';
import { DEFAULT_QUERY_STALE_TIME } from '@/api/baseKy';
import { isCandidate, isSupervisor } from '@/helpers/typeCheck';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { Project } from '@/models/Project';
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
        return supervisorApi.getProjectList();
      }

      if (isCandidate(profileData)) {
        const candidateProjectList: Project[] = [];
        const [activeProject, arhiveProjects] = await Promise.all([
          candidateApi.getActiveProject(),
          candidateApi.getArchiveProjectList(),
        ]);
        if (activeProject) candidateProjectList.push(activeProject);
        candidateProjectList.push(...arhiveProjects);
        return candidateProjectList;
      }

      return [];
    },
    { staleTime: DEFAULT_QUERY_STALE_TIME, ...options },
  );
};
