import ICampusApi from './ICampusApi';
import { baseKyInstance } from '../baseKy';
import { isCandidate } from '@/helpers/typeCheck';
import { UserCandidate, UserSupervisor } from '@/models/User';

export default class CampusApi extends ICampusApi {
  async auth(): Promise<void> {
    const data: { url: string } = await baseKyInstance
      .get('campus_auth')
      .json();
    document.location.replace(data.url);
  }

  async logout(): Promise<void> {
    await baseKyInstance.get('campus_out');
  }

  async getUserInfo(): Promise<UserCandidate | UserSupervisor> {
    const res = await baseKyInstance.get('api/candidate');
    const userInfo: UserCandidate | UserSupervisor = await res.json();

    if (isCandidate(userInfo) && userInfo.canSendParticipations === undefined) {
      userInfo.canSendParticipations = false;
    }

    return userInfo;
  }
}
