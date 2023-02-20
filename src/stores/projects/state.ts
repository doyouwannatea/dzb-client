import {
  Project,
  AdditionalProjectData,
  ProjectFilters,
} from '@/models/Project';

interface State {
  loading: boolean;
  error: string;
  projectList?: Project[];
  userProjectList?: Project[];
  projectCount: number;
  openedProject?: Project;
  filters: ProjectFilters;
  additionalProjectData: AdditionalProjectData;
  projectProgress: number;
}

export const DEFAULT_FILTERS: ProjectFilters = {
  difficulty: [],
  state: [],
  skills: [],
  specialties: [],
  title: '',
  page: 1,
  order: 'asc',
  sortBy: 'state',
};

export const state = (): State => ({
  loading: false,
  error: '',
  projectList: undefined,
  userProjectList: undefined,
  projectCount: 0,
  openedProject: undefined,
  filters: { ...DEFAULT_FILTERS },
  additionalProjectData: {
    states: undefined,
    tags: undefined,
  },
  projectProgress: 0,
});
