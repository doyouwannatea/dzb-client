import {
  Participation,
  ParticipationWithProject,
} from '@/models/Participation';
import { projectApi } from '../ProjectApi';

export default abstract class IParticipationApi {
  abstract getParticipationList(): Promise<ParticipationWithProject[]>;
  abstract getParticipationDeadline(): Promise<string>;

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
}
