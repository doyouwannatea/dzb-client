import { delayRes } from '@/helpers/promise';
import { AuthToken } from '@/models/CampusAuth';
import { Student } from '@/models/Student';
import { authToken } from '@/models/mock/campusAuth';
import { student } from '@/models/mock/student';
import ICampusAuthApi from './ICampusAuthApi';

export class CampusAuthApiMock extends ICampusAuthApi {
  async auth(): Promise<AuthToken> {
    this.setToken(authToken.token);
    return delayRes(authToken, 300);
  }

  async getStudentInfo(): Promise<Student> {
    const authToken = this.getToken();
    if (!authToken) throw new Error('Auth token required!');
    return delayRes(student, 300);
  }
}

export default new CampusAuthApiMock();
