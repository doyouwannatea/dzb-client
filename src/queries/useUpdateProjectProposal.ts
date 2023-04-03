import { projectCreationApi } from '@/api/ProjectCreationApi';
import { useMutation, useQueryClient } from 'vue-query';
import { useProjectProposalListKey } from './useProjectProposalList';

export const useUpdateProjectProposal = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: projectCreationApi.updateProjectProposal,
    onSuccess: () => {
      client.invalidateQueries(useProjectProposalListKey);
    },
  });
};
