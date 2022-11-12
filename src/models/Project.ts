import { Candidate } from './Candidate';
import { Institute } from './Institute';
import { Participation } from './Participation';
import { Difficulty } from './ProjectDifficulty';
import { State } from './ProjectState';

export interface Tag {
  id: number;
  name: string;
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
  participants: Candidate[];
  specialities: Institute[];
  places: number;
  product_result: string;
  requirements: string;
  skills: Tag[];
  state: State;
  study_result: string;
  supervisors: string[];
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
  skills: Tag[];
  specialties: Tag[];
  skillCategories: Tag[];
}

export interface AdditionalProjectData {
  tags?: ProjectTags;
  states?: State[];
}
