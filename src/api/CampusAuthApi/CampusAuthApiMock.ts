import { delayRes } from '@/helpers/promise';
import { Candidate } from '@/models/Candidate';
import { candidate } from '@/models/mock/candidate';
import { participationsList } from '@/models/mock/participation';
import { Participation } from '@/models/Participation';
import { AUTH_TOKEN_REQUIRED } from '@/models/values/error-messages';
import ICampusAuthApi from './ICampusAuthApi';

export class CampusAuthApiMock extends ICampusAuthApi {
  async auth(): Promise<void> {
    this.setAuthToken('test token');
    return delayRes(undefined, 300);
  }

  async getCandidateInfo(): Promise<Candidate> {
    const authToken = this.getAuthToken();
    if (!authToken) throw new Error(AUTH_TOKEN_REQUIRED);
    return delayRes(candidate, 300);
  }

  async getCandidateParticipationsList(): Promise<Participation[]> {
    const authToken = this.getAuthToken();
    if (!authToken) throw new Error(AUTH_TOKEN_REQUIRED);
    return delayRes(participationsList, 300);
  }

  async deleteParticipation(id: number): Promise<void> {
    const authToken = this.getAuthToken();
    if (!authToken) throw new Error(AUTH_TOKEN_REQUIRED);

    const idx = participationsList.findIndex((request) => request.id === id);
    participationsList.splice(idx, 1);
    return delayRes(undefined, 300);
  }

  async setParticipationPriority(
    id: number,
    newPriority: number,
  ): Promise<void> {
    const authToken = this.getAuthToken();
    if (!authToken) throw new Error(AUTH_TOKEN_REQUIRED);

    const idx = participationsList.findIndex((request) => request.id === id);
    participationsList[idx].priority = newPriority;
    return delayRes(undefined, 300);
  }
}

export default new CampusAuthApiMock();
