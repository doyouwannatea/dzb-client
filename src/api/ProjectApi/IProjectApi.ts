import type {
  Project,
  ProjectFilters,
  Supervisor,
  Skill,
  Type,
} from '@/models/Project';
import { State } from '@/models/ProjectState';

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
  abstract getAllSkills(): Promise<Skill[]>;
  abstract getAllSupervisors(): Promise<Supervisor[]>;
  abstract getAllProjectTypes(): Promise<Type[]>;
  abstract getAllProjectStates(): Promise<State[]>;
}
