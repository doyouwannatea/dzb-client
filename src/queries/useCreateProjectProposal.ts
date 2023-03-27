import { projectCreationApi } from '@/api/ProjectCreationApi';
import { useMutation, useQueryClient } from 'vue-query';
import { useProjectProposalListKey } from './useProjectProposalList';

export const useCreateProjectProposal = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: projectCreationApi.createProjectProposal,
    onSuccess: () => {
      client.invalidateQueries(useProjectProposalListKey);
    },
  });
};
