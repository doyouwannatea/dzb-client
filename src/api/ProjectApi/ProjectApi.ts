import { encodeProjectFiltersToQueries } from '@/helpers/query';
import { Project, State, SupervisorName, Tag, Type } from '@/models/Project';

import ProjectApiType, {
  ProjectFilters,
  ProjectListResponse,
} from './ProjectApiType';

export default class ProjectApi extends ProjectApiType {
  static async getProjectList(page: number): Promise<ProjectListResponse> {
    return this.ky.get('api/projects', { searchParams: { page } }).json();
  }

  static async getSingleProject(projectId: number): Promise<Project> {
    return this.ky.get(`api/projects/${projectId}`).json();
  }

  static async filterProjectList(
    filters: ProjectFilters,
  ): Promise<ProjectListResponse> {
    const searchParams = encodeProjectFiltersToQueries(filters);
    return this.ky.get('api/projects/filter', { searchParams }).json();
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

  static async getAllProjectStates(): Promise<State[]> {
    return this.ky.get('api/states').json();
  }
}
