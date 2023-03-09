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
  id: number;
  prevProjectId: number | null;
  title: string;
  places: number;
  goal: string;
  description: string;
  difficulty: Difficulty;
  date_start: string;
  date_end: string;
  requirements: string;
  customer?: string;
  additional_inf?: string;
  product_result: string;
  study_result: string;
  supervisors: string[];
  supervisorsNames: string;
  state: State;
  type: Type;
  skills: Tag[];
  specialities: Institute[];
  participations?: Participation[];
  participants?: Candidate[];
  participant_feedback?: string;
}

export interface ProjectFilters {
  state: number[]; // массив id
  skills: number[]; // массив id
  specialties: number[]; // массив id
  difficulty: Difficulty[]; // Массив сложностей
  title: string; // Поиск по подстроке в названии
  page: number;
  sortBy: keyof Project;
  order: 'asc' | 'desc';
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
