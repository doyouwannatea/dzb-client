import ky from 'ky';
import { Student } from '@/models/Student';
import { AuthToken } from '@/models/CampusAuth';
import ICampusAuthApi from './ICampusAuthApi';

export class CampusAuthApi extends ICampusAuthApi {
  ky = ky.create({
    prefixUrl: import.meta.env.VITE_CAMPUS_AUTH_API_URL,
    retry: { limit: 5 },
  });

  private constructor() {
    super();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  async auth(): Promise<AuthToken> {
    const authToken: AuthToken = await this.ky.get('campus_auth').json();
    this.setToken(authToken.token);
    return authToken;
  }

  async getStudentInfo(): Promise<Student> {
    return this.ky
      .get('api/candidate', { headers: { 'x-api-key': this.getToken() } })
      .json();
  }
}

export default CampusAuthApi.instance;
