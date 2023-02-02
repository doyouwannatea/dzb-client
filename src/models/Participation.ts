import { Candidate } from './Candidate';
import { Project } from './Project';

export const enum ParticipationPriority {
  Low = 3,
  Medium = 2,
  High = 1,
}

export const enum ParticipationState {
  Distribution = 1,
  Active = 2,
  Archived = 3,
  Rejected = 4,
  AutoWithApplication = 5,
  AutoWithoutApplication = 6,
}

export interface Participation {
  id: number;
  candidate_id: number;
  candidate: Candidate;
  state_id: ParticipationState;
  project_id: number;
  priority: ParticipationPriority;
  review: string;
  created_at: string;
  updated_at: string;
}

export type ParticipationWithProject = Participation & { project?: Project };

export const ParticipationPriorityText: Record<ParticipationPriority, string> =
  {
    [ParticipationPriority.High]: 'Высший',
    [ParticipationPriority.Medium]: 'Средний',
    [ParticipationPriority.Low]: 'Низкий',
  };

export const ALL_PRIORITIES = [
  ParticipationPriority.Low,
  ParticipationPriority.Medium,
  ParticipationPriority.High,
];
