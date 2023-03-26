import { delayRes, sleep } from '@/helpers/promise';
import { themeSources } from '@/models/mock/project-proposal';
import { specialties } from '@/models/mock/specialties';
import {
  CreatedProjectProposal,
  ProjectProposal,
} from '@/models/ProjectProposal';
import { Specialty } from '@/models/Specialty';
import { Tag } from '@/models/Tag';
import IProjectCreationApi from './IProjectCreationApi';

export default class ProjectCreationApiMock extends IProjectCreationApi {
  async createProjectProposal(projectProposal: ProjectProposal): Promise<void> {
    await sleep(500);
    console.log(projectProposal);
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
}
