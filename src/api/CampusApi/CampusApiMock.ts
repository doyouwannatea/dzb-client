import { deepClone } from '@/helpers/object';
import { delayRes, sleep } from '@/helpers/promise';
import { userCandidate } from '@/models/mock/candidate';
import { userSupervisor } from '@/models/mock/supervisor';
import { UserCandidate, UserSupervisor } from '@/models/User';
import ICampusApi from './ICampusApi';
import {
  askForMockRole,
  setMockRoleToCookies,
  getMockRoleFromCookies,
} from './utils/askForMockRole';
import { AUTH_REQUIRED } from '@/values/error-messages';
import {
  deleteAuthTokenFromCookies,
  getAuthTokenFromCookies,
  setAuthTokenToCookies,
} from './utils/authToken';

export default class CampusApiMock extends ICampusApi {
  async auth(): Promise<void> {
    const mockRole = askForMockRole();
    if (!mockRole) return;

    setAuthTokenToCookies('token');
    setMockRoleToCookies(mockRole);
    window.location.reload();
  }

  async logout(): Promise<void> {
    await sleep(200);
    deleteAuthTokenFromCookies();
    setMockRoleToCookies(undefined);
  }

  async getUserInfo(): Promise<UserCandidate | UserSupervisor> {
    const token = getAuthTokenFromCookies();
    const mockRole = getMockRoleFromCookies();
    if (!mockRole || !token) throw new Error(AUTH_REQUIRED);
    if (mockRole === 'is_teacher') {
      return delayRes(deepClone(userSupervisor), 300);
    }

    return delayRes(deepClone(userCandidate), 300);
  }
}
