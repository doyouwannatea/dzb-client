import {
  Participation,
  ParticipationPriority,
  ParticipationWithProject,
} from '@/models/Participation';
import { Project } from '@/models/Project';
import { ProjectStateID } from '@/models/ProjectState';

export interface CreateProjectParticipationData {
  priority: ParticipationPriority;
  projectStateId: ProjectStateID;
  projectId: number;
}

export default interface CandidateApiType {
  getActiveProject(): Promise<Project | undefined>;
  getArchiveProjectList(): Promise<Project[]>;
  getParticipationList(): Promise<ParticipationWithProject[]>;
  getParticipationsTime(): Promise<[string, string]>;
  deleteParticipation(id: number): Promise<void>;
  updateParticipation(participationId: number, priority: number): Promise<void>;
  createProjectParticipation(
    data: CreateProjectParticipationData,
  ): Promise<void>;
  getParticipationsWithProjects(
    participations: Participation[],
  ): Promise<ParticipationWithProject[]>;
  updateParticipationList(participations: Participation[]): Promise<void[]>;
}
