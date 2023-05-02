import { DownloadProgress } from 'ky';
import type {
  Project,
  ProjectFilters,
  ProjectType,
  ProjectTags,
} from '@/models/Project';
import { ProjectState } from '@/models/ProjectState';
import { Candidate } from '@/models/Candidate';

export interface ProjectListResponse {
  data: Project[];
  projectCount: number;
}

export type OnDownloadProgress = (
  progress: DownloadProgress,
  chunk: Uint8Array,
) => void;

export default interface ProjectApiType {
  filterProjectList(
    filters: ProjectFilters,
    onDownloadProgress?: OnDownloadProgress,
  ): Promise<ProjectListResponse>;
  getAllProjectTags(): Promise<ProjectTags>;
  getAllProjectTypes(): Promise<ProjectType[]>;
  getAllProjectStates(): Promise<ProjectState[]>;
  getSingleProject(projectId: number): Promise<Project>;
  getProjectParticipants(projectId: number): Promise<Candidate[]>;
  getProjectHistory(projectId: number): Promise<Project[]>;
}
