import { LocationAsRelativeRaw, RouteLocationRaw } from 'vue-router';
import { RouteNames } from '../types/route-names';

export function toProjectRoute(projectId: number): RouteLocationRaw {
  return { name: RouteNames.PROJECT_DETAILS, params: { id: projectId } };
}

export function toProjectProposalCreateRoute(
  proposalId?: number,
): RouteLocationRaw {
  return {
    name: RouteNames.SUPERVISOR_PROJECT_PROPOSAL_CREATE,
    params: { id: proposalId },
  };
}

export const enum FilterInstituteProjectProposalsBy {
  New = 'new',
  Approved = 'approved',
  Rejected = 'rejected',
}

export function toInstituteProjectProposals(
  filterBy = FilterInstituteProjectProposalsBy.New,
  page = 1,
): LocationAsRelativeRaw {
  return {
    name: RouteNames.INST_DIRECTOR_PROJECT_PROPOSALS,
    params: { filterBy, page },
  };
}
