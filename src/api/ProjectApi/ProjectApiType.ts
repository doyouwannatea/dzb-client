import ky from 'ky';
import type { Project, SupervisorName, Tag, Type } from '@/models/Project';

export default abstract class ProjectApiType {
  protected static BASE_URL = 'https://projects.tw1.ru';
  protected static ky = ky.create({ prefixUrl: ProjectApiType.BASE_URL });

  static async getProjectList(page: number): Promise<Project[]> {
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
}
