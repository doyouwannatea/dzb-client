import { delayRes, sleep } from '@/helpers/promise';
import { themeSources } from '@/models/mock/project-proposal';
import { specialties } from '@/models/mock/specialties';
import {
  CreatedProjectProposal,
  NewProjectProposal,
} from '@/models/ProjectProposal';
import { Specialty } from '@/models/Specialty';
import { Tag } from '@/models/Tag';
import IProjectCreationApi, {
  UpdateProjectProposalData,
} from './IProjectCreationApi';
import { Project } from '@/models/Project';

export default class ProjectCreationApiMock extends IProjectCreationApi {
  async createProjectProposal(
    projectProposal: NewProjectProposal,
  ): Promise<CreatedProjectProposal> {
    await sleep(500);
    console.log(projectProposal);
    return {} as CreatedProjectProposal;
  }

  async updateProjectProposal({
    projectProposal,
    id,
  }: UpdateProjectProposalData): Promise<CreatedProjectProposal> {
    await sleep(500);
    console.log(projectProposal);
    console.log(id);
    return {} as CreatedProjectProposal;
  }

  async getThemeSources(): Promise<Tag[]> {
    return delayRes(themeSources, 400);
  }

  async getSpecialties(): Promise<Specialty[]> {
    return delayRes(specialties, 400);
  }

  async getProjectProposalList(): Promise<CreatedProjectProposal[]> {
    return [];
  }

  async getSupervisorProjectList(): Promise<Project[]> {
    return [];
  }
}
