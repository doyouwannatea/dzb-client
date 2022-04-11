import { delayRes } from '@/helpers/promise';
import { Candidate } from '@/models/Candidate';
import { candidate } from '@/models/mock/candidate';
import { participationsList } from '@/models/mock/participation';
import { projectListResponse } from '@/models/mock/project';
import { Participation } from '@/models/Participation';
import { AUTH_TOKEN_REQUIRED } from '@/models/values/error-messages';
import ICampusAuthApi from './ICampusAuthApi';

export class CampusAuthApiMock extends ICampusAuthApi {
  async auth(): Promise<void> {
    this.setAuthToken('test token');
    return delayRes(undefined, 300);
  }

  async getCandidateInfo(): Promise<Candidate> {
    const authToken = this.getAuthToken();
    if (!authToken) throw new Error(AUTH_TOKEN_REQUIRED);
    return delayRes(candidate, 300);
  }

  async getCandidateParticipationsList(): Promise<Participation[]> {
    const authToken = this.getAuthToken();
    if (!authToken) throw new Error(AUTH_TOKEN_REQUIRED);
    return delayRes(participationsList, 300);
  }

  async deleteParticipation(id: number): Promise<void> {
    const authToken = this.getAuthToken();
    if (!authToken) throw new Error(AUTH_TOKEN_REQUIRED);

    const idx = participationsList.findIndex((request) => request.id === id);
    participationsList.splice(idx, 1);
    return delayRes(undefined, 300);
  }

  async setParticipationPriority(
    id: number,
    newPriority: number,
  ): Promise<void> {
    const authToken = this.getAuthToken();
    if (!authToken) throw new Error(AUTH_TOKEN_REQUIRED);

    const idx = participationsList.findIndex((request) => request.id === id);
    participationsList[idx].priority = newPriority;
  }

  async createProjectParticipation(
    priority: number,
    projectId: number,
  ): Promise<void> {
    // проверки на стороне клиента
    const authToken = this.getAuthToken();
    if (!authToken) throw new Error(AUTH_TOKEN_REQUIRED);
    if (priority < 1) throw new Error('Priority must be > 0');
    if (priority > 3) throw new Error('Priority must be < 4');

    // проверки на стороне бекенда
    const project = projectListResponse.data.find(
      (project) => project.id === projectId,
    );
    if (!project) throw new Error('Project not found');
    const participationsList = await this.getCandidateParticipationsList();
    for (const participation of participationsList) {
      if (participation.priority === priority)
        throw new Error('The priority has already been selected');
    }
    const candidate = await this.getCandidateInfo();
    participationsList.push({
      id: Math.floor(Math.random() * 100),
      candidate,
      priority,
      project,
      state: 'заявка отправлена',
      review: 'review',
    });
    return delayRes(undefined, 300);
  }
}

export default new CampusAuthApiMock();
