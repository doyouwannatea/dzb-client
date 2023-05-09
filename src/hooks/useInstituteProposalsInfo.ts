import { ComputedRef, computed } from 'vue';
import { MaybeRef } from '@vueuse/core';
import { ProjectProposalStateId } from '@/models/ProjectProposal';
import { useGetInstituteProjectProposalsQuery } from '@/api/InstituteDirectorApi/hooks/useGetInstituteProjectProposalsQuery';
import { useGetInstituteProjectQuotaQuery } from '@/api/InstituteDirectorApi/hooks/useGetInstituteProjectQuotaQuery';

type ProposalsCount = Record<ProjectProposalStateId, number>;

export type UseInstituteProposalsInfoReturn = {
  proposalsCount: ComputedRef<ProposalsCount>;
  instituteProjectQuota: ComputedRef<number>;
  isLoading: ComputedRef<boolean>;
};

interface Options {
  enabled: MaybeRef<boolean>;
}

export function useInstituteProposalsInfo({
  enabled,
}: Options): UseInstituteProposalsInfoReturn {
  const projectProposalListQuery = useGetInstituteProjectProposalsQuery({
    enabled,
  });
  const instituteProjectQuotaQuery = useGetInstituteProjectQuotaQuery({
    enabled,
  });

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

  const instituteProjectQuota = computed(
    () => instituteProjectQuotaQuery.data.value || 0,
  );

  const isLoading = computed(
    () =>
      instituteProjectQuotaQuery.isFetching.value ||
      projectProposalListQuery.isFetching.value,
  );

  return { proposalsCount, instituteProjectQuota, isLoading };
}
