import { ComputedRef, computed } from 'vue';
import { MaybeRef } from '@vueuse/core';
import { ProjectProposalStateId } from '@/models/ProjectProposal';
import { useProjectProposalList } from '@/queries/useProjectProposalList';

export type Options = {
  enabled?: MaybeRef<boolean>;
};

type ProposalsCount = Record<ProjectProposalStateId, number>;

export type UseInstituteProposalsInfoReturn = {
  proposalsCount: ComputedRef<ProposalsCount>;
};

export function useInstituteProposalsInfo(
  options: Options = {},
): UseInstituteProposalsInfoReturn {
  const projectProposalList = useProjectProposalList({
    enabled: options.enabled,
  });

  const proposalsCount = computed(() => {
    const count: ProposalsCount = {
      [ProjectProposalStateId.Approved]: 0,
      [ProjectProposalStateId.Draft]: 0,
      [ProjectProposalStateId.Rejected]: 0,
      [ProjectProposalStateId.UnderReview]: 0,
    };
    if (!projectProposalList.data.value) return count;

    for (const proposal of projectProposalList.data.value) {
      count[proposal.state.id] += 1;
    }
    return count;
  });

  return { proposalsCount };
}
