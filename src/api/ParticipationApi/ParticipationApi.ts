import {
  Participation,
  ParticipationWithProject,
  ParticipationPriority,
} from '@/models/Participation';
import { HarvestSettings } from '@/models/HarvestSetting';
import { baseKyInstance } from '../baseKy';
import IParticipationApi from './IParticipationApi';
import { isValidDate } from '@/helpers/date';

export default class ParticipationApi extends IParticipationApi {
  async getHarvestSettings(): Promise<HarvestSettings> {
    try {
      const harvestSettings: HarvestSettings = await baseKyInstance
        .get(`api/harvestSettings/active`)
        .json();
      const {
        startDateParticipationHarvest,
        endDateParticipationHarvest,
        startDateProjectHarvest,
        endDateProjectHarvest,
      } = harvestSettings;

      if (
        ![
          startDateParticipationHarvest,
          endDateParticipationHarvest,
          startDateProjectHarvest,
          endDateProjectHarvest,
        ]
          .map(isValidDate)
          .every(Boolean)
      ) {
        throw new Error('неправильная дата из "/api/harvestSettings/active"');
      }

      return harvestSettings;
    } catch (error) {
      console.error(error);
      const currentTime = new Date(Date.now()).toISOString();
      return {
        id: 0,
        startDateParticipationHarvest: currentTime,
        endDateParticipationHarvest: currentTime,
        startDateProjectHarvest: currentTime,
        endDateProjectHarvest: currentTime,
        bannedSpecialities: [],
      };
    }
  }

  async getCandidateParticipationTime(): Promise<string[]> {
    const { startDateParticipationHarvest, endDateParticipationHarvest } =
      await this.getHarvestSettings();
    return [startDateParticipationHarvest, endDateParticipationHarvest];
  }

  async getSupervisorParticipationTime(): Promise<string[]> {
    const { startDateProjectHarvest, endDateProjectHarvest } =
      await this.getHarvestSettings();
    return [startDateProjectHarvest, endDateProjectHarvest];
  }

  async getParticipationList(): Promise<ParticipationWithProject[]> {
    let participations: Participation[] = await baseKyInstance
      .get(`api/participations`)
      .json();
    participations = this.filterValidParticipations(participations);
    return this.getParticipationsWithProjects(participations);
  }

  async deleteParticipation(id: number): Promise<void> {
    return baseKyInstance.delete(`api/participations/${id}`).json();
  }

  async updateParticipation(
    participationId: number,
    priority: ParticipationPriority,
  ): Promise<void> {
    return baseKyInstance
      .patch(`api/participations/${participationId}`, { json: { priority } })
      .json();
  }

  async createProjectParticipation(
    priority: ParticipationPriority,
    projectId: number,
  ): Promise<void> {
    return baseKyInstance
      .post(`api/participations/${projectId}`, { json: { priority } })
      .json();
  }
}
