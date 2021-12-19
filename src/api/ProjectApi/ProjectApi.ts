import { Project, State, SupervisorName, Tag, Type } from '@/models/Project';
import ProjectApiType, { FilterParams } from './ProjectApiType';

export default class ProjectApi extends ProjectApiType {
  static async getProjectList(page: number): Promise<Project[]> {
    return this.ky.get('api/projects', { searchParams: { page } }).json();
  }

  static async filterProjectList(
    searchParams: FilterParams,
  ): Promise<Project[]> {
    const params = {
      type: JSON.stringify(searchParams.type) || '',
      state: JSON.stringify(searchParams.state) || '',
      supervisor: JSON.stringify(searchParams.supervisor) || '',
      tags: JSON.stringify(searchParams.tags) || '',
      date_start: searchParams.date_start || '',
      date_end: searchParams.date_end || '',
      difficulty: JSON.stringify(searchParams.difficulty) || '',
      title: searchParams.title || '',
      page: searchParams.page || 1,
    };
    return this.ky.get('api/projects/filter', { searchParams: params }).json();
  }

  static async getAllTags(): Promise<Tag[]> {
    return this.ky.get('api/tags').json();
  }

  static async getAllSupervisorNames(): Promise<SupervisorName[]> {
    return this.ky.get('api/supervisors/names').json();
  }

  static async getAllProjectTypes(): Promise<Type[]> {
    return this.ky.get('api/types').json();
  }

  static async getAllProjectStates(): Promise<State[]> {
    return this.ky.get('api/states').json();
  }
}
