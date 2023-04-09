import { projectCreationApi } from '@/api/ProjectCreationApi';
import { UseMutationOptions, useMutation, useQueryClient } from 'vue-query';
import { useProjectProposalListKey } from './useProjectProposalList';
import { UpdateProjectProposalData } from '@/api/ProjectCreationApi/IProjectCreationApi';
import { CreatedProjectProposal } from '@/models/ProjectProposal';

export const useUpdateProjectProposalKey = 'useUpdateProjectProposalKey';

export const useUpdateProjectProposal = (
  options?: UseMutationOptions<
    CreatedProjectProposal,
    unknown,
    UpdateProjectProposalData,
    unknown
  >,
) => {
  const client = useQueryClient();

  return useMutation(
    useUpdateProjectProposalKey,
    projectCreationApi.updateProjectProposal,
    {
      onSuccess: () => {
        client.invalidateQueries(useProjectProposalListKey);
      },
      ...options,
    },
  );
};
