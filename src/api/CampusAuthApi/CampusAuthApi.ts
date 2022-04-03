import ky from 'ky';
import { Candidate } from '@/models/Candidate';
import { AuthToken } from '@/models/CampusAuth';
import ICampusAuthApi from './ICampusAuthApi';

export class CampusAuthApi extends ICampusAuthApi {
  private ky = ky.create({
    prefixUrl: import.meta.env.VITE_CAMPUS_AUTH_API_URL,
    retry: { limit: 5 },
  });

  async auth(): Promise<AuthToken> {
    const authToken: AuthToken = await this.ky.get('campus_auth').json();
    this.setToken(authToken.token);
    return authToken;
  }

  async getCandidateInfo(): Promise<Candidate> {
    return this.ky
      .get('api/candidate', { headers: { 'x-api-key': this.getToken() } })
      .json();
  }
}

export default new CampusAuthApi();
