import { projectCreationApi } from '@/api/ProjectCreationApi';
import { CreatedProjectProposal } from '@/models/ProjectProposal';
import { useQuery, UseQueryOptions } from 'vue-query';

export const useProjectProposalListKey = 'useProjectProposalListKey';

export const useProjectProposalList = <T = CreatedProjectProposal[]>(
  options?: UseQueryOptions<
    CreatedProjectProposal[],
    unknown,
    T,
    typeof useProjectProposalListKey
  >,
) =>
  useQuery(
    useProjectProposalListKey,
    projectCreationApi.getProjectProposalList,
    {
      staleTime: Infinity,
      placeholderData: () => [],
      ...options,
    },
  );
