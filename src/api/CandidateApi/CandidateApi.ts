import {
  Participation,
  ParticipationWithProject,
  ParticipationPriority,
} from '@/models/Participation';
import { baseKyInstance } from '../baseKy';
import CandidateApiType, {
  CreateProjectParticipationData,
} from './CandidateApiType';
import { isValidDate } from '@/helpers/date';
import { projectApi } from '../ProjectApi';
import { sharedApi } from '../SharedApi';
import { Project } from '@/models/Project';
import { filterValidParticipations } from './utils/participations';
import { formatProjectDate } from '@/helpers/project';

export default class CandidateApi implements CandidateApiType {
  async getActiveProject(): Promise<Project | undefined> {
    try {
      const project: Project = await baseKyInstance
        .get('api/activeProject')
        .json();
      return formatProjectDate(project);
    } catch (error) {
      return undefined;
    }
  }

  async getArchiveProjectList(): Promise<Project[]> {
    try {
      const projectList: Project[] = await baseKyInstance
        .get('api/arhiveProjects')
        .json();
      return projectList.map(formatProjectDate);
    } catch (error) {
      return [];
    }
  }

  async getParticipationsTime(): Promise<[string, string]> {
    try {
      const { startDateParticipationHarvest, endDateParticipationHarvest } =
        await sharedApi.getHarvestSettings();
      if (
        !isValidDate(startDateParticipationHarvest) ||
        !isValidDate(endDateParticipationHarvest)
      )
        throw new Error('неправильная дата из sharedApi.getHarvestSettings()');
      return [startDateParticipationHarvest, endDateParticipationHarvest];
    } catch (error) {
      console.error(error);
      const currentTime = new Date(Date.now()).toISOString();
      return [currentTime, currentTime];
    }
  }

  async getParticipationList(): Promise<ParticipationWithProject[]> {
    let participations: Participation[] = await baseKyInstance
      .get(`api/participations`)
      .json();
    participations = filterValidParticipations(participations);
    return this.getParticipationsWithProjects(participations);
  }

  async deleteParticipation(id: number): Promise<void> {
    return baseKyInstance.delete(`api/participations/${id}`).json();
  }

  async updateParticipation(
    participationId: number,
    priority: ParticipationPriority,
  ): Promise<void> {
    return baseKyInstance
      .patch(`api/participations/${participationId}`, { json: { priority } })
      .json();
  }

  async createProjectParticipation({
    priority,
    projectId,
  }: CreateProjectParticipationData): Promise<void> {
    return baseKyInstance
      .post(`api/participations/${projectId}`, { json: { priority } })
      .json();
  }

  async getParticipationsWithProjects(
    participations: Participation[],
  ): Promise<ParticipationWithProject[]> {
    return Promise.all(
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
}
