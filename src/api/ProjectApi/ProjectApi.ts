import { projectFiltersToSearchParams } from '@/helpers/query';
import {
  Project,
  ProjectFilters,
  Type,
  ProjectTags,
  Tag,
} from '@/models/Project';
import IProjectApi, {
  OnDownloadProgress,
  ProjectListResponse,
} from './IProjectApi';
import { State } from '@/models/ProjectState';
import { formatProjectDate } from '@/helpers/project';
import { Supervisor } from '@/models/Supervisor';
import { baseKyInstance } from '../baseKy';
import { Candidate } from '@/models/Candidate';

export default class ProjectApi extends IProjectApi {
  async getSingleProject(projectId: number): Promise<Project> {
    const project: Project = await baseKyInstance
      .get(`api/projects/${projectId}`)
      .json();
    project.participants = await this.getProjectParticipants(project.id);
    return formatProjectDate(project);
  }

  async filterProjectList(
    filters: ProjectFilters,
    onDownloadProgress?: OnDownloadProgress,
  ): Promise<ProjectListResponse> {
    const searchParams = projectFiltersToSearchParams(filters);
    const projectListRes: ProjectListResponse = await baseKyInstance
      .get('api/projects/filter', {
        searchParams,
        onDownloadProgress,
      })
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

  async getProjectParticipants(projectId: number): Promise<Candidate[]> {
    try {
      return await baseKyInstance
        .get(`api/projects/${projectId}/participants`)
        .json();
    } catch (error) {
      return [];
    }
  }

  async getActiveUserProject(): Promise<Project | undefined> {
    try {
      return await baseKyInstance.get('api/activeProject').json();
    } catch (error) {
      return undefined;
    }
  }

  async getArhiveUserProjects(): Promise<Project[]> {
    try {
      return await baseKyInstance.get('api/arhiveProjects').json();
    } catch (error) {
      return [];
    }
  }
}
