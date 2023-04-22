import { projectCreationApi } from '@/api/ProjectCreationApi';
import { useMutation, useQueryClient, UseMutationOptions } from 'vue-query';
import { useProjectProposalListKey } from './useProjectProposalList';
import {
  CreatedProjectProposal,
  NewProjectProposal,
} from '@/models/ProjectProposal';

const useCreateProjectProposalKey = 'useCreateProjectProposal';

export const useCreateProjectProposal = (
  options?: UseMutationOptions<
    CreatedProjectProposal,
    unknown,
    NewProjectProposal,
    unknown
  >,
) => {
  const client = useQueryClient();

  return useMutation(
    useCreateProjectProposalKey,
    projectCreationApi.createProjectProposal,
    {
      onSuccess: () => {
        client.invalidateQueries(useProjectProposalListKey);
      },
      ...options,
    },
  );
};
