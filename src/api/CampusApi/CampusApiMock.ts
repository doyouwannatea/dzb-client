import { deepClone } from '@/helpers/array';
import { delayRes } from '@/helpers/promise';
import { userCandidate } from '@/models/mock/candidate';
import { userSupervisor } from '@/models/mock/supervisor';
import { UserCandidate, UserSupervisor } from '@/models/User';
import { AUTH_TOKEN_REQUIRED } from '@/values/error-messages';
import Cookies from 'js-cookie';
import ICampusApi from './ICampusApi';

// Выбор типа пользователя для тестирования функционала без сервера
type MockRole = 'teacher' | 'student';

const MOCK_ROLE_COOKIE_KEY = 'MOCK_ROLE_COOKIE_KEY';

function setMockRole(type: MockRole | '') {
  Cookies.set(MOCK_ROLE_COOKIE_KEY, type);
}
function getMockRole(): MockRole | '' {
  return (Cookies.get(MOCK_ROLE_COOKIE_KEY) as MockRole) || '';
}

export default class CampusApiMock extends ICampusApi {
  async auth(): Promise<void> {
    let mockRole: MockRole | undefined = undefined;

    const isTeacher = window.confirm('Зайти как преподаватель?');
    if (isTeacher) mockRole = 'teacher';

    if (!mockRole) {
      const isStudent = window.confirm('Зайти как студент?');
      if (isStudent) mockRole = 'student';
    }

    if (!mockRole) return;

    setMockRole(mockRole);
    window.location.reload();
  }

  async logout(): Promise<void> {
    await delayRes(undefined, 200);
    setMockRole('');
  }

  async getUserInfo(): Promise<UserCandidate | UserSupervisor> {
    const mockRole = getMockRole();
    if (!mockRole) throw new Error(AUTH_TOKEN_REQUIRED);
    if (mockRole === 'teacher') {
      return delayRes(deepClone(userSupervisor), 300);
    }

    return delayRes(deepClone(userCandidate), 300);
  }
}
