import ky from 'ky';
import { Project } from '@/models/Project';

export default class ProjectApi {
  private static BASE_URL = 'http://projects.tw1.ru/api';
  private static ky = ky.create({ prefixUrl: ProjectApi.BASE_URL });

  static async getProjectList(page: number): Promise<Project[]> {
    return this.ky.get('api/projects', { searchParams: { page } }).json();
  }
}
