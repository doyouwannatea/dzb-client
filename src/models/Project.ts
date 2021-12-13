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

export interface State {
  id: number;
  state: string;
}

export interface Project {
  id: number;
  title: string;
  places: number;
  tags: Tag[];
  goal: string;
  idea: string;
  difficulty: number;
  date_start: string;
  date_end: string;
  requirements: string;
  customer: string;
  expected_result: string;
  additional_inf: string;
  result: string;
  updated_at: string;
  deleted_at: string;
  type_name: string;
  supervisor_name: string;
  vacant_places: number;
  state_name: string;
}
