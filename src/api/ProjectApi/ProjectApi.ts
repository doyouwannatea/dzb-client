import ky from 'ky';
import { encodeProjectFiltersToQueries } from '@/helpers/query';
import {
  Project,
  ProjectFilters,
  State,
  SupervisorName,
  Tag,
  Type,
} from '@/models/Project';
import IProjectApi, { ProjectListResponse } from './IProjectApi';

export class ProjectApi extends IProjectApi {
  private ky = ky.create({
    prefixUrl: 'https://projects.tw1.ru',
    retry: { limit: 5 },
  });

  private constructor() {
    super();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  async getProjectList(page: number): Promise<ProjectListResponse> {
    return this.ky.get('api/projects', { searchParams: { page } }).json();
  }

  async getSingleProject(projectId: number): Promise<Project> {
    return this.ky.get(`api/projects/${projectId}`).json();
  }

  async filterProjectList(
    filters: ProjectFilters,
  ): Promise<ProjectListResponse> {
    const searchParams = encodeProjectFiltersToQueries(filters);
    return this.ky.get('api/projects/filter', { searchParams }).json();
  }

  async getAllTags(): Promise<Tag[]> {
    return this.ky.get('api/tags').json();
  }

  async getAllSupervisorNames(): Promise<SupervisorName[]> {
    return this.ky.get('api/supervisors/names').json();
  }

  async getAllProjectTypes(): Promise<Type[]> {
    return this.ky.get('api/types').json();
  }

  async getAllProjectStates(): Promise<State[]> {
    return this.ky.get('api/states').json();
  }
}

export default ProjectApi.instance;
