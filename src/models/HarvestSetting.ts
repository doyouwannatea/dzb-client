import { SpecialtyGroup } from './Specialty';

export interface HarvestSettings {
  id: number;
  startDateParticipationHarvest: string;
  endDateParticipationHarvest: string;
  startDateProjectHarvest: string;
  endDateProjectHarvest: string;
  bannedSpecialities: Omit<SpecialtyGroup, 'priority'>[];
}
