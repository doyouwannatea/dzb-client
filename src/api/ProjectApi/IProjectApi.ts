import type {
  Project,
  ProjectFilters,
  Type,
  ProjectTags,
} from '@/models/Project';
import { State } from '@/models/ProjectState';
import { Supervisor } from '@/models/Supervisor';

export interface ProjectListResponse {
  data: Project[];
  projectCount: number;
}

export default abstract class IProjectApi {
  abstract filterProjectList(
    filters: ProjectFilters,
  ): Promise<ProjectListResponse>;
  abstract getSingleProject(projectId: number): Promise<Project>;
  abstract getAllProjectTags(): Promise<ProjectTags>;
  abstract getAllSupervisors(): Promise<Supervisor[]>;
  abstract getAllProjectTypes(): Promise<Type[]>;
  abstract getAllProjectStates(): Promise<State[]>;
}
