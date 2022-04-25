import { Candidate } from './Candidate';
import { Project } from './Project';

export const enum Priority {
  Low = 3,
  Medium = 2,
  High = 1,
}

export interface Participation {
  id: number;
  priority: Priority;
  project: Project;
  candidate: Candidate;
  state: string;
  review: string;
}

export const PriorityText: Record<Priority, string> = {
  [Priority.High]: 'Высший',
  [Priority.Medium]: 'Средний',
  [Priority.Low]: 'Низкий',
};

export const ALL_PRIORITIES = [Priority.Low, Priority.Medium, Priority.High];
