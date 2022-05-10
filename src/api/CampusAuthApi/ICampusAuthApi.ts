import { deleteCookie, getCookie, setCookie } from '@/helpers/cookie';
import { Candidate, UserSkills } from '@/models/Candidate';
import {
  Participation,
  ParticipationWithProject,
} from '@/models/Participation';
import { Project, Skill } from '@/models/Project';
import { projectApi } from '../ProjectApi';

export default abstract class ICampusAuthApi {
  public getAuthToken = () => getCookie('token');
  public setAuthToken = (token: string) => setCookie('token', token);
  public deleteAuthToken = () => deleteCookie('token');
  abstract auth(): Promise<void>;
  abstract getCandidateInfo(): Promise<Candidate>;
  abstract getParticipationList(): Promise<ParticipationWithProject[]>;
  async getParticipationsWithProjects(
    participations: Participation[],
  ): Promise<ParticipationWithProject[]> {
    return await Promise.all(
      participations.map(async (participation) => {
        const project = await projectApi.getSingleProject(
          participation.project_id,
        );
        return { ...participation, project };
      }),
    );
  }
  abstract getUserProjectList(): Promise<Project[]>;
  abstract updateParticipation(
    participationId: number,
    priority: number,
  ): Promise<void>;
  async updateParticipationList(
    participations: Participation[],
  ): Promise<void[]> {
    return Promise.all(
      participations.map((participation) =>
        this.updateParticipation(participation.id, participation.priority),
      ),
    );
  }
  abstract deleteParticipation(id: number): Promise<void>;
  abstract createProjectParticipation(
    priority: number,
    projectId: number,
  ): Promise<void>;
  abstract getUserSkills(): Promise<UserSkills>;
  abstract updateUserSkills(skills: Skill[]): Promise<void>;
}
