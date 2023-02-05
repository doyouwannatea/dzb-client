import {
  Participation,
  ParticipationWithProject,
  ParticipationPriority,
} from '@/models/Participation';
import { baseKyInstance } from '../baseKy';
import IParticipationApi from './IParticipationApi';

export default class ParticipationApi extends IParticipationApi {
  async getParticipationDeadline(): Promise<string> {
    try {
      const deadline: string = await baseKyInstance
        .get(`api/participationsDeadline`)
        .text();
      const timestamp = Date.parse(deadline);
      if (isNaN(timestamp)) {
        throw new Error('неправильная дата из "api/participationsDeadline"');
      }

      return deadline;
    } catch (error) {
      return new Date(Date.now()).toISOString();
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
