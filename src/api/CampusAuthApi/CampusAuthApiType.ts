import { AuthToken } from '@/models/CampusAuth';
import { Student } from '@/models/Student';

export default abstract class CampusAuthApiType {
  private static token: string;

  static setToken(token: string) {
    this.token = token;
  }

  static getToken() {
    return this.token;
  }

  static async auth(): Promise<AuthToken> {
    return {} as AuthToken;
  }

  static async getStudentInfo(): Promise<Student> {
    return {} as Student;
  }
}
