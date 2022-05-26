import { deleteCookie, getCookie, setCookie } from '@/helpers/cookie';
import { Candidate } from '@/models/Candidate';

export default abstract class ICampusApi {
  static AUTH_TOKEN_NAME = 'x-api-key';

  static getAuthToken = () => getCookie(ICampusApi.AUTH_TOKEN_NAME);
  static setAuthToken = (token: string) =>
    setCookie(ICampusApi.AUTH_TOKEN_NAME, token);
  static deleteAuthToken = () => deleteCookie(ICampusApi.AUTH_TOKEN_NAME);

  abstract auth(): Promise<void>;
  abstract getUserInfo(): Promise<Candidate>;
}
