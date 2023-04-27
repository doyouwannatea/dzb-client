import {
  CreatedProjectProposal,
  ProjectProposalStateId,
} from '@/models/ProjectProposal';

export interface ReviewProjectProposalData {
  rejection_reason?: string;
  state_id: ProjectProposalStateId.Approved | ProjectProposalStateId.Rejected;
  project_proposal_id: number;
}

export default abstract class IInstituteDirectorApi {
  abstract reviewProjectProposal(
    data: ReviewProjectProposalData,
  ): Promise<CreatedProjectProposal>;
}
