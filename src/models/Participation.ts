import { Candidate } from './Candidate';
import { Project } from './Project';

export interface Participation {
  id: number;
  priority: number;
  project: Project;
  candidate: Candidate;
  state: string;
  review: string;
}
