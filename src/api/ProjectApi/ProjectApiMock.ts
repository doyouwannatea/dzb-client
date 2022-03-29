import { ProjectListResponse } from './IProjectApi';
import type {
  Project,
  ProjectFilters,
  State,
  Supervisor,
  Skill,
  Type,
} from '@/models/Project';
import {
  projectListResponse,
  states,
  skills,
  types,
} from '@/models/mock/project';
import { delayRes } from '@/helpers/promise';
import { supervisorList } from '@/models/mock/supervisor';
import IProjectApi from './IProjectApi';

export class ProjectApiMock extends IProjectApi {
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

  async getAllSkills(): Promise<Skill[]> {
    return delayRes(skills, 300);
  }

  async getAllSupervisors(): Promise<Supervisor[]> {
    return delayRes(supervisorList, 400);
  }

  async getAllProjectTypes(): Promise<Type[]> {
    return delayRes(types, 300);
  }

  async getAllProjectStates(): Promise<State[]> {
    return delayRes(states, 300);
  }
}

export default new ProjectApiMock();
