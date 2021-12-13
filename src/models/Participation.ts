import { Project, Skill } from './Project';

export interface Participation {
  id: number;
  state: string;
  motivation: string;
  skills: Skill[];
  project: Project;
}

export interface ParticipationCreate {
  motivation: string;
  skills: Skill[];
}
