import { CreatedProjectProposal } from '@/models/ProjectProposal';
import { baseKyInstance } from '../baseKy';
import InstituteDirectorApiType, {
  ReviewProjectProposalData,
} from './InstituteDirectorApiType';

export default class InstituteDirectorApi implements InstituteDirectorApiType {
  async reviewProjectProposal(
    data: ReviewProjectProposalData,
  ): Promise<CreatedProjectProposal> {
    const { project_proposal_id: id, ...rest } = data;

    return baseKyInstance
      .patch(`api/director/projects/${id}`, { json: rest })
      .json();
  }
}
