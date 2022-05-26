import {
  Participation,
  ParticipationWithProject,
  Priority,
} from '@/models/Participation';
import { baseKyInstance } from '../baseKy';
import IParticipationApi from './IParticipationApi';
import ParticipationApiMock from './ParticipationApiMock';

export default class ParticipationApi extends IParticipationApi {
  async getParticipationList(): Promise<ParticipationWithProject[]> {
    const participations: Participation[] = await baseKyInstance
      .get(`api/participations`)
      .json();
    return this.getParticipationsWithProjects(participations);
  }

  async deleteParticipation(id: number): Promise<void> {
    return baseKyInstance.delete(`api/participations${id}`).json();
  }

  async updateParticipation(
    participationId: number,
    priority: Priority,
  ): Promise<void> {
    const participationApiMock = new ParticipationApiMock();
    return participationApiMock.updateParticipation(participationId, priority);
  }

  async createProjectParticipation(
    priority: Priority,
    projectId: number,
  ): Promise<void> {
    return baseKyInstance
      .post(`api/participations${projectId}`, {
        body: JSON.stringify({ priority }),
      })
      .json();
  }
}
