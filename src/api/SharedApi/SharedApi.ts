import { HarvestSettings } from '@/models/HarvestSetting';
import SharedApiType from './SharedApiType';
import { baseKyInstance } from '../baseKy';
import { Supervisor } from '@/models/Supervisor';

interface IsInSameInstitute {
  isSame: boolean;
}

export default class SharedApi implements SharedApiType {
  async getHarvestSettings(): Promise<HarvestSettings> {
    return baseKyInstance.get(`api/harvestSettings/active`).json();
  }

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

  async getAllSupervisors(): Promise<Supervisor[]> {
    return baseKyInstance.get('api/supervisors').json();
  }
}
