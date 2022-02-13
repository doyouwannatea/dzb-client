import type {
  Project,
  ProjectFilters,
  State,
  SupervisorName,
  Tag,
  Type,
} from '@/models/Project';

export interface ProjectListResponse {
  data: Project[];
  projectCount: number;
}

export default abstract class ProjectApiType {
  static async getProjectList(page: number): Promise<ProjectListResponse> {
    return { data: [], projectCount: 0 };
  }
  static async filterProjectList(
    filters: ProjectFilters,
  ): Promise<ProjectListResponse> {
    return { data: [], projectCount: 0 };
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
