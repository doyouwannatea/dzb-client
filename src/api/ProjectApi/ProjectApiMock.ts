import { ProjectListResponse } from './IProjectApi';
import type {
  Project,
  ProjectFilters,
  State,
  SupervisorName,
  Tag,
  Type,
} from '@/models/Project';
import {
  projectListResponse,
  states,
  tags,
  types,
} from '@/models/mock/project';
import { delayRes } from '@/helpers/promise';
import { supervisorNames } from '@/models/mock/supervisor';
import IProjectApi from './IProjectApi';

export class ProjectApiMock extends IProjectApi {
  private static _instance: IProjectApi;

  private constructor() {
    super();
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  async getProjectList(page: number): Promise<ProjectListResponse> {
    return delayRes(projectListResponse, 400);
  }

  async filterProjectList(
    filters: ProjectFilters,
  ): Promise<ProjectListResponse> {
    return delayRes(projectListResponse, 400);
  }

  async getSingleProject(projectId: number): Promise<Project> {
    const project = projectListResponse.data.find(
      (singleProject) => singleProject.id === projectId,
    );
    if (!project) throw new Error('проект не найден');
    return delayRes(project, 400);
  }

  async getAllTags(): Promise<Tag[]> {
    return delayRes(tags, 300);
  }

  async getAllSupervisorNames(): Promise<SupervisorName[]> {
    return delayRes(supervisorNames, 400);
  }

  async getAllProjectTypes(): Promise<Type[]> {
    return delayRes(types, 300);
  }

  async getAllProjectStates(): Promise<State[]> {
    return delayRes(states, 300);
  }
}

export default ProjectApiMock.instance;
