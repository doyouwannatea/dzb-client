import { Candidate } from './Candidate';
import { Project } from './Project';

export type Priority = 1 | 2 | 3;

export interface Participation {
  id: number;
  priority: Priority;
  project: Project;
  candidate: Candidate;
  state: string;
  review: string;
}
