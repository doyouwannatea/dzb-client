import { delayRes } from '@/helpers/promise';
import IInsituteApi from './IInsituteApi';

export default class InsituteApiMock extends IInsituteApi {
  async isInSameInstitute(
    specialityName1: string,
    specialityName2: string,
  ): Promise<boolean> {
    return delayRes(specialityName1 === specialityName2, 30);
  }
}
