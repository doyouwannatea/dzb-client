import { delayRes } from '@/helpers/promise';
import { HarvestSettings } from '@/models/HarvestSetting';
import { Supervisor } from '@/models/Supervisor';
import { supervisorList } from '@/models/mock/supervisor';
import SharedApiType from './SharedApiType';

export default class SharedApiMock implements SharedApiType {
  async getHarvestSettings(): Promise<HarvestSettings> {
    const currentTime = new Date(Date.now()).toISOString();

    return {
      id: 1,
      bannedSpecialities: [],
      endDateParticipationHarvest: currentTime,
      endDateProjectHarvest: currentTime,
      startDateParticipationHarvest: currentTime,
      startDateProjectHarvest: currentTime,
    };
  }

  async isInSameInstitute(
    specialityName1: string,
    specialityName2: string,
  ): Promise<boolean> {
    return delayRes(specialityName1 === specialityName2, 500);
  }

  async getAllSupervisors(): Promise<Supervisor[]> {
    return delayRes(supervisorList, 400);
  }
}
