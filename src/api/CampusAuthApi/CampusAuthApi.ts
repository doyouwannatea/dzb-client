import ky from 'ky';
import { Student } from '@/models/Student';
import CampusAuthApiType from './CampusAuthApiType';
import { AuthToken } from '@/models/CampusAuth';

export default class CampusAuthApi extends CampusAuthApiType {
  private static BASE_URL = 'https://projects.tw1.ru';
  private static ky = ky.create({
    prefixUrl: CampusAuthApi.BASE_URL,
    retry: { limit: 5 },
  });

  static async auth(): Promise<AuthToken> {
    const authToken: AuthToken = await this.ky.get('campus_auth').json();
    this.setToken(authToken.token);
    return authToken;
  }

  static async getStudentInfo(): Promise<Student> {
    return this.ky
      .get('api/candidate', { headers: { 'x-api-key': this.getToken() } })
      .json();
  }
}
