import { DownloadProgress } from 'ky';
import { OnDownloadProgress, ProjectListResponse } from './IProjectApi';
import type {
  Project,
  ProjectFilters,
  ProjectTags,
  Type,
} from '@/models/Project';
import { projectListResponse, states, types } from '@/models/mock/project';
import { delayRes, sleep } from '@/helpers/promise';
import { supervisorList } from '@/models/mock/supervisor';
import IProjectApi from './IProjectApi';
import { State } from '@/models/ProjectState';
import { formatProjectDate } from '@/helpers/project';
import { Supervisor } from '@/models/Supervisor';
import {
  skillCategories,
  specialties,
  skills,
} from '@/models/mock/project-skills';
import { deepClone } from '@/helpers/object';
import { Candidate } from '@/models/Candidate';
import { activeProjectId, archiveProjectIdList } from '@/models/mock/candidate';

const createDownloadProgress =
  (totalBytes: number) =>
  (percent: number): DownloadProgress => ({
    percent: percent,
    totalBytes: totalBytes,
    transferredBytes: totalBytes * percent,
  });

export default class ProjectApiMock extends IProjectApi {
  async filterProjectList(
    filters: ProjectFilters,
    onDownloadProgress?: OnDownloadProgress,
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
    if (filters.skills && filters.skills.length > 0) {
      filteredList = filteredList.filter((project) =>
        filters.skills?.some((tag) =>
          project.skills.some((skill) => tag === skill.id),
        ),
      );
    }

    filteredList = filteredList.map(formatProjectDate);

    // постраничная пагинация
    const projectCount = filteredList.length;
    const perPage = 7;
    const page = filters.page || 1;
    const paginatedList = filteredList.slice(
      (page - 1) * perPage,
      page * perPage,
    );

    // имитация загрузки
    const getDownloadProgress = createDownloadProgress(1000);

    await sleep(100);
    onDownloadProgress?.(getDownloadProgress(0.25), new Uint8Array());

    await sleep(200);
    onDownloadProgress?.(getDownloadProgress(0.7), new Uint8Array());

    await sleep(100);
    onDownloadProgress?.(getDownloadProgress(1), new Uint8Array());

    return { projectCount, data: paginatedList };
  }

  async getSingleProject(projectId: number): Promise<Project> {
    const project = projectListResponse.data.find(
      (singleProject) => singleProject.id === projectId,
    );
    if (!project) throw new Error('проект не найден');
    return delayRes(formatProjectDate(project), 400);
  }

  async getAllProjectTags(): Promise<ProjectTags> {
    return delayRes({ skillCategories, skills, specialties }, 300);
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

  async getProjectParticipants(projectId: number): Promise<Candidate[]> {
    const project = projectListResponse.data.find(
      (project) => project.id === projectId,
    );
    return delayRes(project?.participants || [], 300);
  }

  async getProjectHistory(projectId: number): Promise<Project[]> {
    const projects = projectListResponse.data;

    function findPrevProject(projectId: number): Project | undefined {
      return projects.find((project) => project.id === projectId);
    }
    function findNextProject(projectId: number): Project | undefined {
      return projects.find((project) => project.prevProjectId === projectId);
    }

    const currentProject = findPrevProject(projectId);
    if (!currentProject) return [];
    const history: Project[] = [formatProjectDate(currentProject)];

    // [...prev, current, ...next]
    // поиск prev проектов
    let prevProjectId: number | null = currentProject.prevProjectId;
    while (prevProjectId) {
      const project = findPrevProject(prevProjectId);
      if (project) history.unshift(formatProjectDate(project));
      prevProjectId = project?.prevProjectId || null;
    }

    // поиск next проектов
    prevProjectId = projectId;
    while (prevProjectId) {
      const project = findNextProject(prevProjectId);
      if (project) history.push(formatProjectDate(project));
      prevProjectId = project?.id || null;
    }

    return history.map(formatProjectDate);
  }

  async getActiveUserProject(): Promise<Project | undefined> {
    const project = projectListResponse.data.find(
      (project) => project.id === activeProjectId,
    );
    if (!project) return delayRes(project, 300);

    return delayRes(deepClone(formatProjectDate(project)), 300);
  }

  async getArhiveUserProjects(): Promise<Project[]> {
    return delayRes(
      deepClone(
        projectListResponse.data
          .filter((project) => archiveProjectIdList.includes(project.id))
          .map(formatProjectDate),
      ),
      300,
    );
  }
}
