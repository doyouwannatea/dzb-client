import { Project } from '@/models/Project';
import ProjectApiType from './ProjectApiType';

export default class ProjectApi extends ProjectApiType {
  static async getProjectList(page: number): Promise<Project[]> {
    return this.ky.get('projects', { searchParams: { page } }).json();
  }
}
