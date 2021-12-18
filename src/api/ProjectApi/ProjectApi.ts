import { Project, SupervisorName, Tag, Type } from '@/models/Project';
import ProjectApiType from './ProjectApiType';

export default class ProjectApi extends ProjectApiType {
  static async getProjectList(page: number): Promise<Project[]> {
    return this.ky.get('api/projects', { searchParams: { page } }).json();
  }

  static async getAllTags(): Promise<Tag[]> {
    return this.ky.get('api/tags').json();
  }

  static async getAllSupervisorNames(): Promise<SupervisorName[]> {
    return this.ky.get('api/supervisors/names').json();
  }

  static async getAllProjectTypes(): Promise<Type[]> {
    return this.ky.get('api/types').json();
  }
}
