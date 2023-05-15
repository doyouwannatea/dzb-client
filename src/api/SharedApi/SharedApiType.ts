import { HarvestSettings } from '@/models/HarvestSetting';
import { Supervisor } from '@/models/Supervisor';

export default interface SharedApiType {
  getHarvestSettings(): Promise<HarvestSettings>;
  isInSameInstitute(
    specialityName1: string,
    specialityName2: string,
  ): Promise<boolean>;
  getAllSupervisors(): Promise<Supervisor[]>;
}
