import { AuthToken } from '@/models/CampusAuth';
import { Student } from '@/models/Student';

export default abstract class ICampusAuthApi {
  protected static _instance: ICampusAuthApi;
  private token = '';

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  abstract auth(): Promise<AuthToken>;
  abstract getStudentInfo(): Promise<Student>;
}
