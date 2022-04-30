import ky from 'ky';
import { Candidate, UserSkills } from '@/models/Candidate';
import { Participation, Priority } from '@/models/Participation';
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

  async getCandidateParticipationsList(): Promise<Participation[]> {
    const campusAuthApiMock = new CampusAuthApiMock();
    return campusAuthApiMock.getCandidateParticipationsList();
  }

  async deleteParticipation(id: number): Promise<void> {
    const campusAuthApiMock = new CampusAuthApiMock();
    return campusAuthApiMock.deleteParticipation(id);
  }

  async setParticipationPriority(
    participationId: number,
    priority: Priority,
  ): Promise<void> {
    const campusAuthApiMock = new CampusAuthApiMock();
    return campusAuthApiMock.setParticipationPriority(
      participationId,
      priority,
    );
  }

  async createProjectParticipation(
    priority: Priority,
    projectId: number,
  ): Promise<void> {
    const campusAuthApiMock = new CampusAuthApiMock();
    return campusAuthApiMock.createProjectParticipation(priority, projectId);
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
