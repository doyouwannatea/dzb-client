import { Difficulty } from './ProjectDifficulty';
import { State } from './ProjectState';

export interface Skill {
  id: number;
  skill: string;
  created_at: string;
  updated_at: string;
  pivot: {
    project_id: number;
    skill_id: number;
  };
}

export interface Type {
  id: number;
  created_at: string;
  updated_at: string;
  type: string;
}

export interface Supervisor {
  id: number;
  created_at: string;
  updated_at: string;
  fio: string;
  email: string;
  api_token: string | null;
  position: string;
}

export interface Project {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  places: number;
  goal: string;
  idea: string;
  difficulty: Difficulty;
  date_start: string;
  date_end: string;
  requirements: string;
  customer: string;
  expected_result: string;
  additional_inf: string | null;
  result: string | null;
  skills: Skill[];
  type: Type;
  state: State;
  supervisor: Supervisor;
  participant_feedback?: string;
}

export interface ProjectFilters {
  state?: number[]; // массив id
  tags?: number[]; // массив id
  specialities?: number[]; // массив id
  difficulty?: Difficulty[]; // Массив сложностей
  title?: string; // Поиск по подстроке в названии
  page?: number;
}

export interface ProjectTags {
  skills: Skill[];
  specialities: Skill[];
  general: Skill[];
}

export interface AdditionalProjectData {
  tags?: ProjectTags;
  states?: State[];
}
