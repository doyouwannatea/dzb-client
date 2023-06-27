import { storeToRefs } from 'pinia';
import { ComputedRef, computed } from 'vue';
import {
  UseGetInstituteProjectProposalsQueryOptions,
  useGetInstituteProjectProposalsQuery,
} from '@/api/InstituteDirectorApi/hooks/useGetInstituteProjectProposalsQuery';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { ProjectProposalStateId } from '@/models/ProjectProposal';

type ProposalsCount = Record<ProjectProposalStateId, number>;

export type UseInstituteProposalsInfoReturn = {
  proposalsCount: ComputedRef<ProposalsCount>;
  approvedProjectsLimitExceeded: ComputedRef<boolean>;
  isLoading: ComputedRef<boolean>;
};

export function useInstituteProposalsMetaData(
  options?: UseGetInstituteProjectProposalsQueryOptions,
): UseInstituteProposalsInfoReturn {
  const authStore = useAuthStore();
  const { intituteProjectsQuota } = storeToRefs(authStore);
  const projectProposalListQuery =
    useGetInstituteProjectProposalsQuery(options);

  const proposalsCount = computed(() => {
    const count: ProposalsCount = {
      [ProjectProposalStateId.Approved]: 0,
      [ProjectProposalStateId.Draft]: 0,
      [ProjectProposalStateId.Rejected]: 0,
      [ProjectProposalStateId.UnderReview]: 0,
    };
    if (!projectProposalListQuery.data.value) return count;

    for (const proposal of projectProposalListQuery.data.value) {
      count[proposal.state.id] += 1;
    }
    return count;
  });

  const approvedProjectsLimitExceeded = computed(
    () =>
      proposalsCount.value[ProjectProposalStateId.Approved] >
      intituteProjectsQuota.value,
  );

  const isLoading = computed(() => projectProposalListQuery.isFetching.value);

  return { proposalsCount, approvedProjectsLimitExceeded, isLoading };
}
