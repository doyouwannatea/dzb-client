import { ProjectFilters } from '@/api/ProjectApi/ProjectApiType';
import { AllFilterOptions } from '@/hooks/useProjectFiltersOptions/types';
import { Project } from '@/models/Project';

export interface State {
  projectList: Project[] | null;
  projectCount: number;
  loading: boolean;
  error: string;
  filters: ProjectFilters;
  filterOptions: AllFilterOptions | null;
}

export const state = (): State => ({
  projectList: null,
  projectCount: 0,
  loading: false,
  error: '',
  filters: {
    difficulty: [],
    state: [],
    supervisor: [],
    tags: [],
    type: [],
    date_end: '',
    date_start: '',
    title: '',
    page: 1,
  },
  filterOptions: null,
});
