import Cookies from 'js-cookie';
import { UserCandidate, UserSupervisor } from '@/models/User';

export default abstract class ICampusApi {
  static AUTH_TOKEN_NAME = 'x-api-key';

  static getAuthToken = () => Cookies.get(ICampusApi.AUTH_TOKEN_NAME);
  static setAuthToken = (token: string) =>
    Cookies.set(ICampusApi.AUTH_TOKEN_NAME, token);
  static deleteAuthToken = () => Cookies.remove(ICampusApi.AUTH_TOKEN_NAME);

  abstract auth(): Promise<void>;
  abstract logout(): Promise<void>;
  abstract getUserInfo(): Promise<UserCandidate | UserSupervisor>;
}
