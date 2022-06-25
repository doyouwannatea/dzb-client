import { projectFiltersToSearchParams } from '@/helpers/query';
import {
  Project,
  ProjectFilters,
  Type,
  ProjectTags,
  Tag,
} from '@/models/Project';
import IProjectApi, { ProjectListResponse } from './IProjectApi';
import { State } from '@/models/ProjectState';
import { formatProjectDate } from '@/helpers/project';
import { Supervisor } from '@/models/Supervisor';
import { baseKyInstance } from '../baseKy';
import ProjectApiMock from './ProjectApiMock';

export default class ProjectApi extends IProjectApi {
  async getSingleProject(projectId: number): Promise<Project> {
    const project: Project = await baseKyInstance
      .get(`api/projects/${projectId}`)
      .json();
    return formatProjectDate(project);
  }

  async filterProjectList(
    filters: ProjectFilters,
  ): Promise<ProjectListResponse> {
    const searchParams = projectFiltersToSearchParams(filters);
    const projectListRes: ProjectListResponse = await baseKyInstance
      .get('api/projects/filter', { searchParams })
      .json();
    projectListRes.data = projectListRes.data.map(formatProjectDate);
    return projectListRes;
  }

  async getAllProjectTags(): Promise<ProjectTags> {
    const tags: Record<string, Tag[]> = await baseKyInstance
      .get('api/skills')
      .json();

    // сортировка по алфавиту
    for (const key in tags) {
      tags[key].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    }

    // костыль, т.к. TS не даёт итерироваться по ProjectTags, пришлось привести его к Record<string, Tag>
    return tags as unknown as ProjectTags;
  }

  async getAllSupervisors(): Promise<Supervisor[]> {
    return baseKyInstance.get('api/supervisors').json();
  }

  async getAllProjectTypes(): Promise<Type[]> {
    return baseKyInstance.get('api/types').json();
  }

  async getAllProjectStates(): Promise<State[]> {
    return baseKyInstance.get('api/states').json();
  }

  async getUserProjectList(): Promise<Project[]> {
    const projectApiMock = new ProjectApiMock();
    return projectApiMock.getUserProjectList();
  }
}
