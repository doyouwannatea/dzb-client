import {
  Project,
  AdditionalProjectData,
  ProjectFilters,
} from '@/models/Project';

interface State {
  loading: boolean;
  error: string;
  projectList?: Project[];
  projectCount: number;
  openedProject?: Project;
  filters: ProjectFilters;
  additionalProjectData: AdditionalProjectData;
}

export const state = (): State => ({
  loading: false,
  error: '',
  projectList: undefined,
  projectCount: 0,
  openedProject: undefined,
  filters: {
    difficulty: [],
    state: [],
    tags: [],
    specialities: [],
    title: '',
    page: 1,
  },
  additionalProjectData: {
    states: undefined,
    tags: undefined,
  },
});
