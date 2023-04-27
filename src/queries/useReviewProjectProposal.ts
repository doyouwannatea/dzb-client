import { UseMutationOptions, useQueryClient, useMutation } from 'vue-query';
import { instituteDirectorApi } from '@/api/InstituteDirectorApi';
import { ReviewProjectProposalData } from '@/api/InstituteDirectorApi/IInstituteDirectorApi';
import { CreatedProjectProposal } from '@/models/ProjectProposal';
import { useProjectProposalListKey } from './useProjectProposalList';

export const useReviewProjectProposalKey = 'useReviewProjectProposalKey';

export const useReviewProjectProposal = (
  options?: UseMutationOptions<
    CreatedProjectProposal,
    unknown,
    ReviewProjectProposalData,
    unknown
  >,
) => {
  const client = useQueryClient();

  return useMutation(
    useReviewProjectProposalKey,
    instituteDirectorApi.reviewProjectProposal,
    {
      onSuccess: () => {
        client.invalidateQueries(useProjectProposalListKey);
      },
      ...options,
    },
  );
};
