import { deepClone } from '@/helpers/array';
import { delayRes } from '@/helpers/promise';
import { Candidate } from '@/models/Candidate';
import { candidate } from '@/models/mock/candidate';
import { Supervisor } from '@/models/Supervisor';
import { AUTH_TOKEN_REQUIRED } from '@/values/error-messages';
import ICampusApi from './ICampusApi';

export default class CampusApiMock extends ICampusApi {
  async auth(): Promise<void> {
    ICampusApi.setAuthToken(
      '6956a5x2a38zf27ad9ce3b9b464b73d2131e4bd01053333e758ae00a6fddf995',
    );
    window.location.replace('/');
    return delayRes(undefined, 300);
  }

  async logout(): Promise<void> {
    await delayRes(undefined, 200);
    ICampusApi.deleteAuthToken();
  }

  async getUserInfo(): Promise<Candidate | Supervisor> {
    const authToken = ICampusApi.getAuthToken();
    if (!authToken) throw new Error(AUTH_TOKEN_REQUIRED);
    return delayRes(deepClone(candidate), 300);
  }
}
