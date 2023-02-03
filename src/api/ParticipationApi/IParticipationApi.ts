import {
  Participation,
  ParticipationState,
  ParticipationWithProject,
} from '@/models/Participation';
import { projectApi } from '../ProjectApi';

export default abstract class IParticipationApi {
  abstract getParticipationList(): Promise<ParticipationWithProject[]>;
  abstract getParticipationDeadline(): Promise<string>;
  abstract updateParticipation(
    participationId: number,
    priority: number,
  ): Promise<void>;
  abstract deleteParticipation(id: number): Promise<void>;
  abstract createProjectParticipation(
    priority: number,
    projectId: number,
  ): Promise<void>;

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

  async updateParticipationList(
    participations: Participation[],
  ): Promise<void[]> {
    return Promise.all(
      participations.map((participation) =>
        this.updateParticipation(participation.id, participation.priority),
      ),
    );
  }

  filterValidParticipations(participations: Participation[]): Participation[] {
    return participations.filter(
      ({ state_id }) =>
        state_id !== ParticipationState.Archived &&
        state_id !== ParticipationState.Rejected,
    );
  }
}
