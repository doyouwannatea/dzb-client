import { Institute } from './Institute';
import { Participation } from './Participation';
import { Difficulty } from './ProjectDifficulty';
import { State } from './ProjectState';
import { Supervisor } from './Supervisor';

export interface Skill {
  id: number;
  skill: string;
  skillCategory_id: number;
}

export interface Type {
  id: number;
  type: string;
}

export interface Project {
  additional_inf: string | null;
  created_at: string;
  customer: string;
  date_end: string;
  date_start: string;
  description: string;
  difficulty: Difficulty;
  goal: string;
  id: number;
  participations: Participation[];
  specialities: Institute[];
  places: number;
  product_result: string;
  requirements: string;
  skills: Skill[];
  state: State;
  study_result: string;
  supervisor: Supervisor;
  title: string;
  type: Type;
  idea: string;
  updated_at: string;
  participant_feedback: string | null;
}

export interface ProjectFilters {
  state?: number[]; // массив id
  skills?: number[]; // массив id
  specialties?: number[]; // массив id
  difficulty?: Difficulty[]; // Массив сложностей
  title?: string; // Поиск по подстроке в названии
  page?: number;
}

export interface ProjectTags {
  skills: Skill[];
  specialties: Skill[];
  skillCategories: Skill[];
}

export interface AdditionalProjectData {
  tags?: ProjectTags;
  states?: State[];
}
