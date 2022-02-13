import { delayRes } from '@/helpers/promise';
import { AuthToken } from '@/models/CampusAuth';
import { Student } from '@/models/Student';
import { authToken } from '@/models/mock/campusAuth';
import { student } from '@/models/mock/student';
import CampusAuthApiType from './CampusAuthApiType';

export default class CampusAuthApiMock extends CampusAuthApiType {
  static async auth(): Promise<AuthToken> {
    this.setToken(authToken.token);
    return delayRes(authToken, 300);
  }

  static async getStudentInfo(): Promise<Student> {
    const authToken = this.getToken();
    if (!authToken) throw new Error('Auth token required!');
    return delayRes(student, 300);
  }
}
