import { FilterParams } from '@/api/ProjectApi/ProjectApiType';
import { Project } from '@/models/Project';

export type ProjectFilters = Omit<FilterParams, 'page'>;

export interface State {
  projectList: Project[] | null;
  loading: boolean;
  error: string;
  page: number;
  filters: ProjectFilters;
}

export const state = (): State => ({
  projectList: null,
  loading: false,
  error: '',
  page: 1,
  filters: {
    difficulty: [],
    state: [],
    supervisor: [],
    tags: [],
    type: [],
    date_end: '',
    date_start: '',
    title: '',
  },
});
