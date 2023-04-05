import {
  Participation,
  ParticipationWithProject,
  ParticipationPriority,
} from '@/models/Participation';
import { HarvestSettings } from '@/models/HarvestSetting';
import { baseKyInstance } from '../baseKy';
import IParticipationApi from './IParticipationApi';

export default class ParticipationApi extends IParticipationApi {
  async getParticipationTime(): Promise<string[]> {
    try {
      const harvestSettings: HarvestSettings = await baseKyInstance
        .get(`/api/harvestSettings/active`)
        .json();
      const start: string = harvestSettings.startDateParticipationHarvest;
      const end: string = harvestSettings.endDateParticipationHarvest;
      if (isNaN(Date.parse(start)) || isNaN(Date.parse(end))) {
        throw new Error('неправильная дата из "/api/harvestSettings/active"');
      }

      return [start, end];
    } catch (error) {
      return [
        new Date(Date.now()).toISOString(),
        new Date(Date.now()).toISOString(),
      ];
    }
  }

  async getProjectTime(): Promise<string[]> {
    try {
      const harvestSettings: HarvestSettings = await baseKyInstance
        .get(`/api/harvestSettings/active`)
        .json();
      const start: string = harvestSettings.startDateProjectHarvest;
      const end: string = harvestSettings.endDateProjectHarvest;
      if (isNaN(Date.parse(start)) || isNaN(Date.parse(end))) {
        throw new Error('неправильная дата из "/api/harvestSettings/active"');
      }

      return [start, end];
    } catch (error) {
      return [
        new Date(Date.now()).toISOString(),
        new Date(Date.now()).toISOString(),
      ];
    }
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
