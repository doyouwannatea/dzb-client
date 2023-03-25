import { sleep } from '@/helpers/promise';
import { ProjectProposal } from '@/models/ProjectProposal';
import IProjectCreationApi from './IProjectCreationApi';

export default class ProjectCreationApiMock extends IProjectCreationApi {
  async createApplication(projectProposal: ProjectProposal): Promise<void> {
    await sleep(500);
    console.log(projectProposal);
  }
}
