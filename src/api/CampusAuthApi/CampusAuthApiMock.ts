import { delayRes } from '@/helpers/promise';
import { AuthToken } from '@/models/CampusAuth';
import { Candidate } from '@/models/Candidate';
import { authToken } from '@/models/mock/campusAuth';
import { candidate } from '@/models/mock/candidate';
import { participationsList } from '@/models/mock/participation';
import { Participation } from '@/models/Participation';
import ICampusAuthApi from './ICampusAuthApi';

export class CampusAuthApiMock extends ICampusAuthApi {
  async auth(): Promise<AuthToken> {
    this.setToken(authToken.token);
    return delayRes(authToken, 300);
  }

  async getCandidateInfo(): Promise<Candidate> {
    const authToken = this.getToken();
    if (!authToken) throw new Error('Auth token required!');
    return delayRes(candidate, 300);
  }

  async getCandidateParticipationsList(): Promise<Participation[]> {
    if (!authToken) throw new Error('Auth token required!');
    return delayRes(participationsList, 300);
  }
}

export default new CampusAuthApiMock();
