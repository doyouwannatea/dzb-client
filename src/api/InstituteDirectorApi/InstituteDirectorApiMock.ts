import { CreatedProjectProposal } from '@/models/ProjectProposal';
import InstituteDirectorApiType, {
  ReviewProjectProposalData,
} from './InstituteDirectorApiType';
import { delayRes } from '@/helpers/promise';

export default class InstituteDirectorApiMock
  implements InstituteDirectorApiType
{
  async reviewProjectProposal(
    data: ReviewProjectProposalData,
  ): Promise<CreatedProjectProposal> {
    return delayRes({} as CreatedProjectProposal, 500);
  }
}
