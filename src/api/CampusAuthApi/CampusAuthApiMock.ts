import { deepClone } from '@/helpers/array';
import { formatProjectDate } from '@/helpers/project';
import { delayRes } from '@/helpers/promise';
import { Candidate, UserSkills } from '@/models/Candidate';
import { candidate, userSkills } from '@/models/mock/candidate';
import { participationList } from '@/models/mock/participation';
import { projectListResponse } from '@/models/mock/project';
import {
  Participation,
  ParticipationWithProject,
  Priority,
} from '@/models/Participation';
import { Project, Skill } from '@/models/Project';
import { AUTH_TOKEN_REQUIRED } from '@/values/error-messages';
import { projectApi } from '../ProjectApi';
import ICampusAuthApi from './ICampusAuthApi';

export default class CampusAuthApiMock extends ICampusAuthApi {
  async auth(): Promise<void> {
    this.setAuthToken(
      '6956a5x2a38zf27ad9ce3b9b464b73d2131e4bd01053333e758ae00a6fddf995',
    );
    window.location.reload();
    return delayRes(undefined, 300);
  }

  async getCandidateInfo(): Promise<Candidate> {
    const authToken = this.getAuthToken();
    if (!authToken) throw new Error(AUTH_TOKEN_REQUIRED);
    return delayRes(deepClone(candidate), 300);
  }

  async getParticipationList(): Promise<ParticipationWithProject[]> {
    const authToken = this.getAuthToken();
    if (!authToken) throw new Error(AUTH_TOKEN_REQUIRED);

    const participationsWithProjects = await this.getParticipationsWithProjects(
      participationList,
    );

    return delayRes(deepClone(participationsWithProjects), 300);
  }

  async deleteParticipation(id: number): Promise<void> {
    const authToken = this.getAuthToken();
    if (!authToken) throw new Error(AUTH_TOKEN_REQUIRED);

    const idx = participationList.findIndex((request) => request.id === id);
    participationList.splice(idx, 1);
    return delayRes(undefined, 300);
  }

  async updateParticipation(
    participationId: number,
    priority: Priority,
  ): Promise<void> {
    const authToken = this.getAuthToken();
    if (!authToken) throw new Error(AUTH_TOKEN_REQUIRED);
    if (priority < 1) throw new Error('Priority must be > 0');
    if (priority > 3) throw new Error('Priority must be < 4');

    const participation = participationList.find(
      (request) => request.id === participationId,
    );
    if (!participation) throw new Error('participation not found');
    participation.priority = priority;
    return delayRes(undefined, 300);
  }

  async createProjectParticipation(
    priority: Priority,
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
    for (const participation of participationList) {
      if (participation.priority === priority)
        throw new Error('The priority has already been selected');
    }
    const candidate = await this.getCandidateInfo();
    participationList.push({
      id: Math.floor(Math.random() * 100),
      candidate_id: candidate.id,
      priority,
      project_id: project.id,
      state_id: 0,
      review: 'review',
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString(),
    });
    return delayRes(undefined, 300);
  }

  async getUserProjectList(): Promise<Project[]> {
    const projects = projectListResponse.data.filter(
      (project) => project.participant_feedback,
    );
    return delayRes(deepClone(projects.map(formatProjectDate)), 300);
  }

  async getUserSkills(): Promise<UserSkills> {
    return delayRes(userSkills, 300);
  }

  async updateUserSkills(skills: Skill[]): Promise<void> {
    userSkills.personal = deepClone(skills);
    candidate.skills = [...userSkills.personal, ...userSkills.common];
    return delayRes(undefined, 300);
  }
}
