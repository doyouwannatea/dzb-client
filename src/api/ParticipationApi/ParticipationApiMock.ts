import { deepClone } from '@/helpers/object';
import { delayRes } from '@/helpers/promise';
import { isSupervisor } from '@/helpers/typeCheck';
import { participationList } from '@/models/mock/participation';
import { projectListResponse } from '@/models/mock/project';
import {
  ParticipationWithProject,
  ParticipationPriority,
} from '@/models/Participation';
import { AUTH_REQUIRED } from '@/values/error-messages';
import { campusApi } from '../CampusApi';
import { getAuthTokenFromCookies } from '../CampusApi/utils/authToken';
import IParticipationApi from './IParticipationApi';

export default class ParticipationApiMock extends IParticipationApi {
  async getParticipationDeadline(): Promise<string> {
    return delayRes(new Date(Date.now() + 100000000).toISOString(), 1000);
  }

  async getParticipationList(): Promise<ParticipationWithProject[]> {
    const authToken = getAuthTokenFromCookies();
    if (!authToken) throw new Error(AUTH_REQUIRED);

    const participationsWithProjects = await this.getParticipationsWithProjects(
      this.filterValidParticipations(participationList),
    );

    return delayRes(deepClone(participationsWithProjects), 300);
  }

  async deleteParticipation(id: number): Promise<void> {
    const authToken = getAuthTokenFromCookies();
    if (!authToken) throw new Error(AUTH_REQUIRED);

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
    const authToken = getAuthTokenFromCookies();
    if (!authToken) throw new Error(AUTH_REQUIRED);

    const participation = participationList.find(
      (participation) => participation.id === participationId,
    );
    if (!participation) throw new Error('Заявка не найдена');
    participation.priority = priority;
    return delayRes(undefined, 300);
  }

  async createProjectParticipation(
    priority: ParticipationPriority,
    projectId: number,
  ): Promise<void> {
    // проверки на стороне клиента
    const authToken = getAuthTokenFromCookies();
    if (!authToken) throw new Error(AUTH_REQUIRED);
    if (priority < 1) throw new Error('Приоритет должен быть > 0');
    if (priority > 3) throw new Error('Приоритет должен быть > 0 < 4');

    // проверки на стороне бекенда
    const project = projectListResponse.data.find(
      (project) => project.id === projectId,
    );
    if (!project) throw new Error('Project not found');
    for (const participation of participationList) {
      if (participation.priority === priority)
        throw new Error('Такой приоритет уже выбран');
    }

    const candidate = await campusApi.getUserInfo();
    if (!candidate) return;
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
