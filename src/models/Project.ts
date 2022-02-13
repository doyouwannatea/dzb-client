export interface Tag {
  id: number;
  tag: string;
}

export interface Skill {
  id: number;
  skill: string;
}

export interface Type {
  id: number;
  type: string;
}

export interface SupervisorName {
  id: number;
  fio: string;
}

export type StateName = 'Открытый' | 'Активный' | 'Обработка' | 'Закрытый';

export interface State {
  id: number;
  state: StateName;
}

export type Difficulty = 1 | 2 | 3;

export interface Project {
  id: number;
  title: string;
  places: number;
  tags: Tag[];
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
  updated_at: string;
  deleted_at: string | null;
  type_name: string;
  supervisor_name: string;
  vacant_places: number;
  state_name: StateName;
}

export interface ProjectFilters {
  type?: number[];
  state?: number[]; // массив id
  supervisor?: number[]; // массив id
  tags?: number[]; // массив id
  date_start?: string;
  date_end?: string;
  difficulty?: number[]; // Массив сложностей
  title?: string; // Поиск по подстроке в названии
  page?: number;
}
