import { CreatedProjectProposal } from '@/models/ProjectProposal';
import { baseKyInstance } from '../baseKy';
import InstituteDirectorApiType, {
  ReviewProjectProposalData,
} from './InstituteDirectorApiType';
import { delayRes } from '@/helpers/promise';

export default class InstituteDirectorApi implements InstituteDirectorApiType {
  async reviewProjectProposal(
    data: ReviewProjectProposalData,
  ): Promise<CreatedProjectProposal> {
    const { project_proposal_id: id, ...rest } = data;

    return baseKyInstance
      .patch(`api/director/projects/${id}`, { json: rest })
      .json();
  }

  async getInstituteProjectProposals(): Promise<CreatedProjectProposal[]> {
    return baseKyInstance.get('api/director/projects').json();
  }

  async getInstituteProjectQuota(): Promise<number> {
    const quota = 15;
    return delayRes(quota, 300);
  }
}
