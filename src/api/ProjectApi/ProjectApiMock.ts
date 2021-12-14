import { Project } from '@/models/Project';
import { project } from '@/models/mock/project';
import { delayRes } from '@/helpers/promise';
import ProjectApiType from './ProjectApiType';

export default class ProjectApiMock extends ProjectApiType {
  static async getProjectList(page: number): Promise<Project[]> {
    return delayRes([project], 400);
  }
}
