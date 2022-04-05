import ky from 'ky';
import { Candidate } from '@/models/Candidate';
import ICampusAuthApi from './ICampusAuthApi';
import { Participation } from '@/models/Participation';
import campusAuthApiMock from './CampusAuthApiMock';
import { getCookie } from '@/helpers/cookie';

export class CampusAuthApi extends ICampusAuthApi {
  private ky = ky.create({
    prefixUrl: import.meta.env.VITE_CAMPUS_AUTH_API_URL,
    retry: { limit: 5 },
  });

  async auth(): Promise<void> {
    const data: { url: string } = await this.ky.get('campus_auth').json();
    document.location.replace(data.url);
  }

  async getCandidateInfo(): Promise<Candidate> {
    return this.ky
      .get('api/candidate', { headers: { 'x-api-key': this.getAuthToken() } })
      .json();
  }

  async getCandidateParticipationsList(): Promise<Participation[]> {
    return campusAuthApiMock.getCandidateParticipationsList();
  }
}

export default new CampusAuthApi();
