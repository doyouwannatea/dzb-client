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

export interface Skill {
  id: number;
  skill: string;
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

export type StateName = 'Открытый' | 'Активный' | 'Обработка' | 'Закрытый';

export interface State {
  id: number;
  created_at: string;
  updated_at: string;
  state: StateName;
}

export interface Project {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  places: number;
  goal: string;
  idea: string;
  difficulty: number;
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
  type?: number[];
  state?: number[]; // массив id
  supervisor?: number[]; // массив id
  skills?: number[]; // массив id
  date_start?: string;
  date_end?: string;
  difficulty?: number[]; // Массив сложностей
  title?: string; // Поиск по подстроке в названии
  page?: number;
}
