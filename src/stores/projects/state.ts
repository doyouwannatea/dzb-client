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
  projectProgress: number;
}

export const state = (): State => ({
  loading: false,
  error: '',
  projectList: undefined,
  projectCount: 0,
  openedProject: undefined,
  filters: {
    difficulty: undefined,
    state: undefined,
    skills: undefined,
    specialties: undefined,
    title: undefined,
    page: undefined,
  },
  additionalProjectData: {
    states: undefined,
    tags: undefined,
  },
  projectProgress: 0,
});
