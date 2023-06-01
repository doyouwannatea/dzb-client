import { delayRes } from '@/helpers/promise';
import { CreatedProjectProposal } from '@/models/ProjectProposal';
import InstituteDirectorApiType, {
  ReviewProjectProposalData,
} from './InstituteDirectorApiType';

export default class InstituteDirectorApiMock
  implements InstituteDirectorApiType
{
  async reviewProjectProposal(
    data: ReviewProjectProposalData,
  ): Promise<CreatedProjectProposal> {
    return delayRes({} as CreatedProjectProposal, 500);
  }

  async getInstituteProjectProposals(): Promise<CreatedProjectProposal[]> {
    return delayRes([], 500);
  }
}
