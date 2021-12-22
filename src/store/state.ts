import { FilterParams } from '@/api/ProjectApi/ProjectApiType';
import { AllFilterOptions } from '@/hooks/useProjectFiltersOptions/types';
import { Project } from '@/models/Project';

export type ProjectFilters = Omit<FilterParams, 'page'>;

export interface State {
  projectList: Project[] | null;
  loading: boolean;
  error: string;
  page: number;
  filters: ProjectFilters;
  filterOptions: AllFilterOptions | null;
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
  filterOptions: null,
});
