import { projectCreationApi } from '@/api/ProjectCreationApi';
import { MaybeRef } from '@vueuse/core';
import { useQuery } from 'vue-query';

export const useProjectProposalListKey = 'useProjectProposalListKey';
export const useProjectProposalList = (enabled?: MaybeRef<boolean>) =>
  useQuery(
    useProjectProposalListKey,
    projectCreationApi.getProjectProposalList,
    {
      staleTime: Infinity,
      placeholderData: () => [],
      enabled,
    },
  );
