import { Candidate } from '@/models/Candidate';
import ICampusApi from './ICampusApi';
import { baseKyInstance } from '../baseKy';

export default class CampusApi extends ICampusApi {
  async auth(): Promise<void> {
    const data: { url: string } = await baseKyInstance
      .get('campus_auth')
      .json();
    document.location.replace(data.url);
  }

  async getUserInfo(): Promise<Candidate> {
    return baseKyInstance.get('api/candidate').json();
  }
}
