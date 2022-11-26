import { Candidate } from '@/models/Candidate';
import ICampusApi from './ICampusApi';
import { baseKyInstance } from '../baseKy';
import { Supervisor } from '@/models/Supervisor';
import { isCandidate } from '@/helpers/typeCheck';

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

  async getUserInfo(): Promise<Candidate | Supervisor> {
    const res = await baseKyInstance.get('api/candidate');
    if (res.status === 202) {
      await this.logout();
      const errorMsg =
        'Внимание!\n В настоящее время функционал проекта частично готов только для студента';
      window.alert(errorMsg);
      throw new Error(errorMsg);
    }
    const userInfo: Candidate | Supervisor = await res.json();

    if (isCandidate(userInfo)) {
      const hasCanSendParticipations = Object.prototype.hasOwnProperty.call<
        typeof userInfo,
        [keyof typeof userInfo],
        boolean
      >(userInfo, 'canSendParticipations');
      if (!hasCanSendParticipations) {
        userInfo.canSendParticipations = false;
      }
    }

    return userInfo;
  }
}
