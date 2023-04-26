import { RouteLocationRaw } from 'vue-router';
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
