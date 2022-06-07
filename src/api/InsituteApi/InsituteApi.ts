import { baseKyInstance } from '../baseKy';
import IInsituteApi from './IInsituteApi';

interface IsInSameInstitute {
  isSame: boolean;
}

export default class InsituteApi extends IInsituteApi {
  async isInSameInstitute(
    specialityName1: string,
    specialityName2: string,
  ): Promise<boolean> {
    const res: IsInSameInstitute = await baseKyInstance
      .get(
        `api/institutes/isInSameInstitute/${specialityName1}/${specialityName2}`,
      )
      .json();

    return res.isSame;
  }
}
