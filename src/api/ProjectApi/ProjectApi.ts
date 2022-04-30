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
import { formatProjectDate } from '@/helpers/project';

export default class ProjectApi extends IProjectApi {
  private ky = ky.create({
    prefixUrl: import.meta.env.VITE_PROJECT_API_URL,
    retry: { limit: 5 },
  });

  async getSingleProject(projectId: number): Promise<Project> {
    const project: Project = await this.ky
      .get(`api/projects/${projectId}`)
      .json();
    return formatProjectDate(project);
  }

  async filterProjectList(
    filters: ProjectFilters,
  ): Promise<ProjectListResponse> {
    const searchParams = projectFiltersToSearchParams(filters);
    const projectListRes: ProjectListResponse = await this.ky
      .get('api/projects/filter', { searchParams })
      .json();
    projectListRes.data = projectListRes.data.map(formatProjectDate);
    return projectListRes;
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
