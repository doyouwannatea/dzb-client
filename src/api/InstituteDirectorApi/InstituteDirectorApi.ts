import { CreatedProjectProposal } from '@/models/ProjectProposal';
import { baseKyInstance } from '../baseKy';
import IInstituteDirectorApi, {
  ReviewProjectProposalData,
} from './IInstituteDirectorApi';

export default class InstituteDirectorApi extends IInstituteDirectorApi {
  async reviewProjectProposal(
    data: ReviewProjectProposalData,
  ): Promise<CreatedProjectProposal> {
    const { project_proposal_id: id, ...rest } = data;

    return baseKyInstance
      .patch(`api/director/projects/${id}`, { json: rest })
      .json();
  }
}
