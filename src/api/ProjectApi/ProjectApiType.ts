import ky from 'ky';
import type {
  Project,
  State,
  SupervisorName,
  Tag,
  Type,
} from '@/models/Project';

export interface FilterParams {
  type?: number[];
  state?: number[]; // массив id
  supervisor?: number[]; // массив id
  tags?: number[]; // массив id
  date_start?: string;
  date_end?: string;
  difficulty?: number[]; // Массив сложностей
  title?: string; // Поиск по подстроке в названии
  page?: number;
}

export default abstract class ProjectApiType {
  protected static BASE_URL = 'https://projects.tw1.ru';
  protected static ky = ky.create({ prefixUrl: ProjectApiType.BASE_URL });

  static async getProjectList(page: number): Promise<Project[]> {
    return [];
  }
  static async filterProjectList(
    searchParams: FilterParams,
  ): Promise<Project[]> {
    return [];
  }
  static async getSingleProject(projectId: number): Promise<Project> {
    return {} as Project;
  }
  static async getAllTags(): Promise<Tag[]> {
    return [];
  }
  static async getAllSupervisorNames(): Promise<SupervisorName[]> {
    return [];
  }
  static async getAllProjectTypes(): Promise<Type[]> {
    return [];
  }
  static async getAllProjectStates(): Promise<State[]> {
    return [];
  }
}
