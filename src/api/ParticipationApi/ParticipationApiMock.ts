import { deepClone } from '@/helpers/array';
import { delayRes, sleep } from '@/helpers/promise';
import { isSupervisor } from '@/helpers/typeCheck';
import { participationList } from '@/models/mock/participation';
import { projectListResponse } from '@/models/mock/project';
import {
  ParticipationWithProject,
  ParticipationPriority,
} from '@/models/Participation';
import { AUTH_TOKEN_REQUIRED } from '@/values/error-messages';
import { campusApi } from '../CampusApi';
import ICampusApi from '../CampusApi/ICampusApi';
import IParticipationApi from './IParticipationApi';

export default class ParticipationApiMock extends IParticipationApi {
  async getParticipationDeadline(): Promise<string> {
    return delayRes(new Date(Date.now() + 100000000).toISOString(), 1000);
  }

  async getParticipationList(): Promise<ParticipationWithProject[]> {
    const authToken = ICampusApi.getAuthToken();
    if (!authToken) throw new Error(AUTH_TOKEN_REQUIRED);

    const participationsWithProjects = await this.getParticipationsWithProjects(
      participationList,
    );

    return delayRes(deepClone(participationsWithProjects), 300);
  }

  async deleteParticipation(id: number): Promise<void> {
    const authToken = ICampusApi.getAuthToken();
    if (!authToken) throw new Error(AUTH_TOKEN_REQUIRED);

    const idx = participationList.findIndex(
      (participation) => participation.id === id,
    );
    participationList.splice(idx, 1);
    return delayRes(undefined, 300);
  }

  async updateParticipation(
    participationId: number,
    priority: ParticipationPriority,
  ): Promise<void> {
    const authToken = ICampusApi.getAuthToken();
    if (!authToken) throw new Error(AUTH_TOKEN_REQUIRED);
    if (priority < 1) throw new Error('Priority must be > 0');
    if (priority > 3) throw new Error('Priority must be < 4');

    const participation = participationList.find(
      (participation) => participation.id === participationId,
    );
    if (!participation) throw new Error('participation not found');
    participation.priority = priority;
    return delayRes(undefined, 300);
  }

  async createProjectParticipation(
    priority: ParticipationPriority,
    projectId: number,
  ): Promise<void> {
    // проверки на стороне клиента
    const authToken = ICampusApi.getAuthToken();
    if (!authToken) throw new Error(AUTH_TOKEN_REQUIRED);
    if (priority < 1) throw new Error('Priority must be > 0');
    if (priority > 3) throw new Error('Priority must be < 4');

    // проверки на стороне бекенда
    const project = projectListResponse.data.find(
      (project) => project.id === projectId,
    );
    if (!project) throw new Error('Project not found');
    for (const participation of participationList) {
      if (participation.priority === priority)
        throw new Error('The priority has already been selected');
    }

    const candidate = await campusApi.getUserInfo();
    if (isSupervisor(candidate)) return;
    participationList.push({
      id: Math.floor(Math.random() * 100),
      candidate,
      priority,
      candidate_id: candidate.id,
      project_id: project.id,
      state_id: 0,
      review: 'review',
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString(),
    });
    return delayRes(undefined, 300);
  }
}
