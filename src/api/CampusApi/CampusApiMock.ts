import { deepClone } from '@/helpers/object';
import { delayRes, sleep } from '@/helpers/promise';
import { userCandidate } from '@/models/mock/candidate';
import { userSupervisor } from '@/models/mock/supervisor';
import { UserCandidate, UserSupervisor } from '@/models/User';
import ICampusApi from './ICampusApi';
import {
  askForUserRole,
  setUserRoleToCookies,
  getUserRoleFromCookies,
} from './utils/askForUserRole';
import { AUTH_REQUIRED } from '@/values/error-messages';
import {
  deleteAuthTokenFromCookies,
  getAuthTokenFromCookies,
  setAuthTokenToCookies,
} from './utils/authToken';

export default class CampusApiMock extends ICampusApi {
  async auth(): Promise<void> {
    const mockRole = askForUserRole();
    if (!mockRole) return;

    setAuthTokenToCookies('token');
    setUserRoleToCookies(mockRole);
    window.location.reload();
  }

  async logout(): Promise<void> {
    await sleep(200);
    deleteAuthTokenFromCookies();
    setUserRoleToCookies(undefined);
  }

  async getCandidateInfo(): Promise<UserCandidate> {
    return delayRes(deepClone(userCandidate), 300);
  }

  async getSupervisorInfo(): Promise<UserSupervisor> {
    return delayRes(deepClone(userSupervisor), 300);
  }

  async getUserInfo(): Promise<UserCandidate | UserSupervisor | undefined> {
    const token = getAuthTokenFromCookies();
    const mockRole = getUserRoleFromCookies();
    if (!mockRole || !token) throw new Error(AUTH_REQUIRED);
    if (mockRole === 'is_teacher') return this.getSupervisorInfo();
    if (mockRole === 'is_student') return this.getCandidateInfo();
    return undefined;
  }
}
