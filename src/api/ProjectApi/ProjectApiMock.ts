import ProjectApiType, {
  FilterParams,
  ProjectListResponse,
} from './ProjectApiType';
import type {
  Project,
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

export default class ProjectApiMock extends ProjectApiType {
  static async getProjectList(page: number): Promise<ProjectListResponse> {
    return delayRes(projectListResponse, 400);
  }

  static async filterProjectList(
    searchParams: FilterParams,
  ): Promise<ProjectListResponse> {
    return delayRes(projectListResponse, 400);
  }

  static async getSingleProject(projectId: number): Promise<Project> {
    const project = projectListResponse.data.find(
      (singleProject) => singleProject.id === projectId,
    );
    if (!project) throw new Error('проект не найден');
    return delayRes(project, 400);
  }

  static async getAllTags(): Promise<Tag[]> {
    return delayRes(tags, 300);
  }

  static async getAllSupervisorNames(): Promise<SupervisorName[]> {
    return delayRes(supervisorNames, 400);
  }

  static async getAllProjectTypes(): Promise<Type[]> {
    return delayRes(types, 300);
  }

  static async getAllProjectStates(): Promise<State[]> {
    return delayRes(states, 300);
  }
}
