import { Candidate } from '@/models/Candidate';
import ICampusApi from './ICampusApi';
import { baseKyInstance } from '../baseKy';
import { Supervisor } from '@/models/Supervisor';

export default class CampusApi extends ICampusApi {
  async auth(): Promise<void> {
    const data: { url: string } = await baseKyInstance
      .get('campus_auth')
      .json();
    document.location.replace(data.url);
  }

  async getUserInfo(): Promise<Candidate | Supervisor> {
    const res = await baseKyInstance.get('api/candidate');
    if (res.status === 202) {
      const errorMsg =
        'Внимание!\n В настоящее время функционал проекта частично готов только для студента';
      window.alert(errorMsg);
      throw new Error(errorMsg);
    }
    return res.json();
  }
}
