import { delayRes } from '@/helpers/promise';
import { Candidate } from '@/models/Candidate';
import { candidate } from '@/models/mock/candidate';
import { participationsList } from '@/models/mock/participation';
import { Participation } from '@/models/Participation';
import ICampusAuthApi from './ICampusAuthApi';

export class CampusAuthApiMock extends ICampusAuthApi {
  async auth(): Promise<void> {
    this.setAuthToken('test token');
    return delayRes(undefined, 300);
  }

  async getCandidateInfo(): Promise<Candidate> {
    const authToken = this.getAuthToken();
    if (!authToken) throw new Error('Auth token required!');
    return delayRes(candidate, 300);
  }

  async getCandidateParticipationsList(): Promise<Participation[]> {
    const authToken = this.getAuthToken();
    if (!authToken) throw new Error('Auth token required!');
    return delayRes(participationsList, 300);
  }
}

export default new CampusAuthApiMock();
