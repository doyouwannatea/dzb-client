import IProjectCreationApi, {
  UpdateProjectProposalData,
} from './IProjectCreationApi';
import { baseKyInstance } from '../baseKy';
import {
  CreatedProjectProposal,
  NewProjectProposal,
  PROJECT_PROPOSAL_IDS,
} from '@/models/ProjectProposal';
import { Tag } from '@/models/Tag';
import { Specialty } from '@/models/Specialty';
import { Project } from '@/models/Project';
import { formatProjectDate, isProject, isProposal } from '@/helpers/project';

export default class ProjectCreationApi extends IProjectCreationApi {
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

  async getSupervisorProjectList(): Promise<Project[]> {
    const projectProposals = await baseKyInstance
      .get('api/supervisor/projects')
      .json<(Project | CreatedProjectProposal)[]>();

    return projectProposals.filter(isProject).map(formatProjectDate);
  }
}
