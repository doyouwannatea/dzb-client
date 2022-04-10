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

export type StateName = 'идёт набор' | 'активный' | 'добор' | 'в архиве';

export interface State {
  id: number;
  created_at: string;
  updated_at: string;
  state: StateName;
}

export type Difficulty = 1 | 2 | 3;

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
}

export interface ProjectFilters {
  state?: number[]; // массив id
  tags?: number[]; // массив id
  difficulty?: Difficulty[]; // Массив сложностей
  title?: string; // Поиск по подстроке в названии
  page?: number;
}

export interface ProjectFilterOptions {
  allTags?: Skill[];
  allStates?: State[];
}
