import { Candidate } from './Candidate';
import { Project } from './Project';

export const enum Priority {
  Low = 3,
  Medium = 2,
  High = 1,
}

export interface Participation {
  id: number;
  candidate_id: number;
  candidate: Candidate;
  state_id: number;
  project_id: number;
  priority: Priority;
  review: string;
  created_at: string;
  updated_at: string;
}

export type ParticipationWithProject = Participation & { project?: Project };

export const PriorityText: Record<Priority, string> = {
  [Priority.High]: 'Высший',
  [Priority.Medium]: 'Средний',
  [Priority.Low]: 'Низкий',
};

export const ALL_PRIORITIES = [Priority.Low, Priority.Medium, Priority.High];
