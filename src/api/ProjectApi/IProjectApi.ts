import type {
  Project,
  ProjectFilters,
  State,
  Supervisor,
  Skill,
  Type,
  ProjectTags,
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
  abstract getAllProjectTags(): Promise<ProjectTags>;
  abstract getAllSupervisors(): Promise<Supervisor[]>;
  abstract getAllProjectTypes(): Promise<Type[]>;
  abstract getAllProjectStates(): Promise<State[]>;
}
