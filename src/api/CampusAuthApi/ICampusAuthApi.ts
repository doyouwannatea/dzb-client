import { AuthToken } from '@/models/CampusAuth';
import { Student } from '@/models/Student';

export default abstract class ICampusAuthApi {
  protected token = '';
  getToken = () => this.token;
  setToken = (token: string) => (this.token = token);
  abstract auth(): Promise<AuthToken>;
  abstract getStudentInfo(): Promise<Student>;
}
