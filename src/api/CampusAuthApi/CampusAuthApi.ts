import ky from 'ky';
import { Candidate, UserSkills } from '@/models/Candidate';
import {
  Participation,
  ParticipationWithProject,
  Priority,
} from '@/models/Participation';
import { Project, Skill } from '@/models/Project';
import ICampusAuthApi from './ICampusAuthApi';
import CampusAuthApiMock from './CampusAuthApiMock';

export default class CampusAuthApi extends ICampusAuthApi {
  private ky = ky.create({
    prefixUrl: import.meta.env.VITE_CAMPUS_AUTH_API_URL,
    retry: { limit: 5, statusCodes: [408, 413, 429, 502, 503, 504] },
  });

  async auth(): Promise<void> {
    const data: { url: string } = await this.ky.get('campus_auth').json();
    document.location.replace(data.url);
  }

  async getCandidateInfo(): Promise<Candidate> {
    return this.ky
      .get('api/candidate', { headers: { 'x-api-key': this.getAuthToken() } })
      .json();
  }

  async getParticipationList(): Promise<ParticipationWithProject[]> {
    const participations: Participation[] = await this.ky
      .get(`api/participations`, {
        headers: { 'x-api-key': this.getAuthToken() },
      })
      .json();
    return this.getParticipationsWithProjects(participations);
  }

  async deleteParticipation(id: number): Promise<void> {
    return this.ky
      .get(`api/participations${id}`, {
        headers: { 'x-api-key': this.getAuthToken() },
        method: 'delete',
      })
      .json();
  }

  async updateParticipation(
    participationId: number,
    priority: Priority,
  ): Promise<void> {
    const campusAuthApiMock = new CampusAuthApiMock();
    return campusAuthApiMock.updateParticipation(participationId, priority);
  }

  async createProjectParticipation(
    priority: Priority,
    projectId: number,
  ): Promise<void> {
    return this.ky
      .get(`api/participations${projectId}`, {
        headers: { 'x-api-key': this.getAuthToken() },
        method: 'post',
        body: JSON.stringify({ priority }),
      })
      .json();
  }

  async getUserProjectList(): Promise<Project[]> {
    const campusAuthApiMock = new CampusAuthApiMock();
    return campusAuthApiMock.getUserProjectList();
  }

  async getUserSkills(): Promise<UserSkills> {
    const campusAuthApiMock = new CampusAuthApiMock();
    return campusAuthApiMock.getUserSkills();
  }

  async updateUserSkills(skills: Skill[]): Promise<void> {
    const campusAuthApiMock = new CampusAuthApiMock();
    return campusAuthApiMock.updateUserSkills(skills);
  }
}
