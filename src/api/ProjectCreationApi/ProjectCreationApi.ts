import IProjectCreationApi from './IProjectCreationApi';
import { baseKyInstance } from '../baseKy';
import { ProjectProposal } from '@/models/ProjectProposal';

export default class ProjectCreationApi extends IProjectCreationApi {
  async createApplication(projectProposal: ProjectProposal): Promise<void> {
    return baseKyInstance
      .post('api/supervisor/projects', { json: projectProposal })
      .json();
  }
}
