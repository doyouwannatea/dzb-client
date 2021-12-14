import ky from 'ky';
import type { Project } from '@/models/Project';

export default abstract class ProjectApiType {
  protected static BASE_URL = 'https://projects.tw1.ru/api';
  protected static ky = ky.create({ prefixUrl: ProjectApiType.BASE_URL });

  static async getProjectList(page: number): Promise<Project[]> {
    return [];
  }
}
