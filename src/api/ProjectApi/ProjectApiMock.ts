import { ProjectListResponse } from './IProjectApi';
import type {
  Project,
  ProjectFilters,
  ProjectTags,
  Type,
} from '@/models/Project';
import { projectListResponse, states, types } from '@/models/mock/project';
import { delayRes } from '@/helpers/promise';
import { supervisorList } from '@/models/mock/supervisor';
import IProjectApi from './IProjectApi';
import { State } from '@/models/ProjectState';
import { formatProjectDate } from '@/helpers/project';
import { Supervisor } from '@/models/Supervisor';
import {
  generalSkills,
  specialities,
  skills,
} from '@/models/mock/project-skills';
import { deepClone } from '@/helpers/array';

export default class ProjectApiMock extends IProjectApi {
  async filterProjectList(
    filters: ProjectFilters,
  ): Promise<ProjectListResponse> {
    let filteredList = projectListResponse.data;
    // DIFFICULTY
    if (filters.difficulty && filters.difficulty.length > 0) {
      filteredList = filteredList.filter((project) =>
        filters.difficulty?.includes(project.difficulty),
      );
    }
    // STATE
    if (filters.state && filters.state.length > 0) {
      filteredList = filteredList.filter((project) =>
        filters.state?.includes(project.state.id),
      );
    }
    // TITLE
    if (filters.title) {
      filteredList = filteredList.filter(
        (project) =>
          filters.title &&
          project.title.toLowerCase().includes(filters.title.toLowerCase()),
      );
    }
    // TAGS
    if (filters.tags && filters.tags.length > 0) {
      filteredList = filteredList.filter((project) =>
        filters.tags?.some((tag) =>
          project.skills.some((skill) => tag === skill.id),
        ),
      );
    }

    filteredList = filteredList.map(formatProjectDate);

    return delayRes(
      { projectCount: filteredList.length, data: filteredList },
      400,
    );
  }

  async getSingleProject(projectId: number): Promise<Project> {
    const project = projectListResponse.data.find(
      (singleProject) => singleProject.id === projectId,
    );
    if (!project) throw new Error('проект не найден');
    return delayRes(formatProjectDate(project), 400);
  }

  async getAllProjectTags(): Promise<ProjectTags> {
    return delayRes({ general: generalSkills, skills, specialities }, 300);
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

  async getUserProjectList(): Promise<Project[]> {
    const projects = projectListResponse.data.filter(
      (project) => project.participant_feedback,
    );
    return delayRes(deepClone(projects.map(formatProjectDate)), 300);
  }
}
