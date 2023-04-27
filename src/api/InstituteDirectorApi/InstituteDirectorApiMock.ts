import { CreatedProjectProposal } from '@/models/ProjectProposal';
import IInstituteDirectorApi, {
  ReviewProjectProposalData,
} from './IInstituteDirectorApi';
import { delayRes } from '@/helpers/promise';

export default class InstituteDirectorApiMock extends IInstituteDirectorApi {
  async reviewProjectProposal(
    data: ReviewProjectProposalData,
  ): Promise<CreatedProjectProposal> {
    return delayRes({} as CreatedProjectProposal, 500);
  }
}
