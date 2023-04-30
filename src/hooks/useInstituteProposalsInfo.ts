import { ComputedRef, computed } from 'vue';
import { MaybeRef } from '@vueuse/core';
import { ProjectProposalStateId } from '@/models/ProjectProposal';
import { useProjectProposalList } from '@/queries/useProjectProposalList';

export type Settings = {
  enabled?: MaybeRef<boolean>;
};

export type InstProposalsInfo = {
  newCount: ComputedRef<number>;
  approvedCount: ComputedRef<number>;
};

export function useInstituteProposalsInfo(
  settings: Settings = {},
): InstProposalsInfo {
  const projectProposalList = useProjectProposalList({
    enabled: settings.enabled,
  });

  const newCount = computed(
    () =>
      projectProposalList.data.value?.filter(
        (proposal) => proposal.state.id === ProjectProposalStateId.UnderReview,
      )?.length || 0,
  );
  const approvedCount = computed(
    () =>
      projectProposalList.data.value?.filter(
        (proposal) => proposal.state.id === ProjectProposalStateId.Approved,
      )?.length || 0,
  );

  return { approvedCount, newCount };
}
