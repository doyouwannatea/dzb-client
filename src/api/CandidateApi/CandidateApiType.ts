import {
  Participation,
  ParticipationPriority,
  ParticipationWithProject,
} from '@/models/Participation';
import { Project } from '@/models/Project';

export default interface CandidateApiType {
  getActiveProject(): Promise<Project | undefined>;
  getArchiveProjectList(): Promise<Project[]>;
  getParticipationList(): Promise<ParticipationWithProject[]>;
  getParticipationsTime(): Promise<[string, string]>;
  deleteParticipation(id: number): Promise<void>;
  updateParticipation(participationId: number, priority: number): Promise<void>;
  createProjectParticipation(
    priority: number,
    projectId: number,
  ): Promise<void>;
  getParticipationsWithProjects(
    participations: Participation[],
  ): Promise<ParticipationWithProject[]>;
  updateParticipationList(participations: Participation[]): Promise<void[]>;
}
