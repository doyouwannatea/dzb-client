import { isValidDate } from '@/helpers/date';
import { formatProjectDate, isProject, isProposal } from '@/helpers/project';
import { Project } from '@/models/Project';
import {
  CreatedProjectProposal,
  NewProjectProposal,
} from '@/models/ProjectProposal';
import { Specialty } from '@/models/Specialty';
import { Tag } from '@/models/Tag';
import { sharedApi } from '../SharedApi';
import { baseKyInstance } from '../baseKy';
import SupervisorApiType, {
  UpdateProjectProposalData,
} from './SupervisorApiType';

export default class SupervisorApi implements SupervisorApiType {
  async getProposalsTime(): Promise<[string, string]> {
    try {
      const { startDateProjectHarvest, endDateProjectHarvest } =
        await sharedApi.getHarvestSettings();
      if (
        !isValidDate(startDateProjectHarvest) ||
        !isValidDate(endDateProjectHarvest)
      )
        throw new Error('неправильная дата из sharedApi.getHarvestSettings()');
      return [startDateProjectHarvest, endDateProjectHarvest];
    } catch (error) {
      console.error(error);
      const currentTime = new Date(Date.now()).toISOString();
      return [currentTime, currentTime];
    }
  }

  async createProjectProposal(
    projectProposal: NewProjectProposal,
  ): Promise<CreatedProjectProposal> {
    return baseKyInstance
      .post('api/supervisor/projects', { json: projectProposal })
      .json();
  }

  async updateProjectProposal({
    projectProposal,
    id,
  }: UpdateProjectProposalData): Promise<CreatedProjectProposal> {
    return baseKyInstance
      .patch(`api/supervisor/projects/${id}`, { json: projectProposal })
      .json();
  }

  async deleteProjectProposal(
    projectProposalId: number,
  ): Promise<CreatedProjectProposal> {
    return baseKyInstance
      .delete(`api/supervisor/projects/${projectProposalId}`)
      .json();
  }

  async getThemeSources(): Promise<Tag[]> {
    return baseKyInstance.get('api/themeSources').json();
  }

  async getSpecialties(): Promise<Specialty[]> {
    return baseKyInstance.get('api/specialities').json();
  }

  async getProjectProposalList(): Promise<CreatedProjectProposal[]> {
    const projectProposals = await baseKyInstance
      .get('api/supervisor/projects')
      .json<CreatedProjectProposal[]>();
    return projectProposals.filter(isProposal).map(formatProjectDate);
  }

  async getProjectList(): Promise<Project[]> {
    const projectProposals = await baseKyInstance
      .get('api/supervisor/projects')
      .json<(Project | CreatedProjectProposal)[]>();

    return projectProposals.filter(isProject).map(formatProjectDate);
  }
}
