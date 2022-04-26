import ky from 'ky';
import { projectFiltersToSearchParams } from '@/helpers/query';
import {
  Project,
  ProjectFilters,
  Supervisor,
  Type,
  ProjectTags,
} from '@/models/Project';
import IProjectApi, { ProjectListResponse } from './IProjectApi';
import { State } from '@/models/ProjectState';

export class ProjectApi extends IProjectApi {
  private ky = ky.create({
    prefixUrl: import.meta.env.VITE_PROJECT_API_URL,
    retry: { limit: 5 },
  });

  async getProjectList(page: number): Promise<ProjectListResponse> {
    return this.ky.get('api/projects', { searchParams: { page } }).json();
  }

  async getSingleProject(projectId: number): Promise<Project> {
    return this.ky.get(`api/projects/${projectId}`).json();
  }

  async filterProjectList(
    filters: ProjectFilters,
  ): Promise<ProjectListResponse> {
    const searchParams = projectFiltersToSearchParams(filters);
    return this.ky.get('api/projects/filter', { searchParams }).json();
  }

  async getAllProjectTags(): Promise<ProjectTags> {
    return this.ky.get('api/skills').json();
  }

  async getAllSupervisors(): Promise<Supervisor[]> {
    return this.ky.get('api/supervisors').json();
  }

  async getAllProjectTypes(): Promise<Type[]> {
    return this.ky.get('api/types').json();
  }

  async getAllProjectStates(): Promise<State[]> {
    return this.ky.get('api/states').json();
  }
}

export default new ProjectApi();
