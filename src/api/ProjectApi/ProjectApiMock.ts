import { Project } from '@/models/Project';
import { projects } from '@/models/mock/project';
import { delayRes } from '@/helpers/promise';
import ProjectApiType from './ProjectApiType';

export default class ProjectApiMock extends ProjectApiType {
  static async getProjectList(page: number): Promise<Project[]> {
    return delayRes(projects, 400);
  }

  static async getSingleProject(projectId: number): Promise<Project> {
    const project = projects.find(
      (singleProject) => singleProject.id === projectId,
    );
    if (!project) throw new Error('проект не найден');
    return delayRes(project, 400);
  }
}
