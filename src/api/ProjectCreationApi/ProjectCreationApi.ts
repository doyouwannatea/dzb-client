import IProjectCreationApi from './IProjectCreationApi';
import { baseKyInstance } from '../baseKy';
import { ProjectProposal } from '@/models/ProjectProposal';
import { Tag } from '@/models/Tag';
import { Specialty } from '@/models/Specialty';

export default class ProjectCreationApi extends IProjectCreationApi {
  async createProjectProposal(projectProposal: ProjectProposal): Promise<void> {
    return baseKyInstance
      .post('api/supervisor/projects', { json: projectProposal })
      .json();
  }

  async getThemeSources(): Promise<Tag[]> {
    return baseKyInstance.get('api/themeSources').json();
  }

  async getSpecialties(): Promise<Specialty[]> {
    return baseKyInstance.get('api/specialities').json();
  }
}
