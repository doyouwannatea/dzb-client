import type {
  Project,
  ProjectFilters,
  Type,
  ProjectTags,
} from '@/models/Project';
import { State } from '@/models/ProjectState';
import { Supervisor } from '@/models/Supervisor';
import { DownloadProgress } from 'ky';
export type OnDownloadProgress = (
  progress: DownloadProgress,
  chunk: Uint8Array,
) => void;
export interface ProjectListResponse {
  data: Project[];
  projectCount: number;
}

export default abstract class IProjectApi {
  abstract filterProjectList(
    filters: ProjectFilters,
    onDownloadProgress?: OnDownloadProgress,
  ): Promise<ProjectListResponse>;
  abstract getSingleProject(projectId: number): Promise<Project>;
  abstract getAllProjectTags(): Promise<ProjectTags>;
  abstract getAllSupervisors(): Promise<Supervisor[]>;
  abstract getAllProjectTypes(): Promise<Type[]>;
  abstract getAllProjectStates(): Promise<State[]>;
  abstract getUserProjectList(): Promise<Project[]>;
}
