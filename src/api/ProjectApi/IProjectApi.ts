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

export default abstract class IProjectApi {
  abstract getProjectList(page: number): Promise<ProjectListResponse>;
  abstract filterProjectList(
    filters: ProjectFilters,
  ): Promise<ProjectListResponse>;
  abstract getSingleProject(projectId: number): Promise<Project>;
  abstract getAllTags(): Promise<Tag[]>;
  abstract getAllSupervisorNames(): Promise<SupervisorName[]>;
  abstract getAllProjectTypes(): Promise<Type[]>;
  abstract getAllProjectStates(): Promise<State[]>;
}
