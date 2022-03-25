import {
  Project,
  Supervisor,
  Skill,
  Type,
  State as ProjectState,
  ProjectFilters,
} from '@/models/Project';

export interface ProjectFilterOptions {
  allSkills?: Skill[];
  allTypes?: Type[];
  allSupervisors?: Supervisor[];
  allStates?: ProjectState[];
}

interface State {
  projectList?: Project[];
  projectCount: number;
  loading: boolean;
  error: string;
  filters: ProjectFilters;
  filterOptions: ProjectFilterOptions;
  openedProject?: Project;
  requestModalShow: boolean;
}

export const state = (): State => ({
  requestModalShow: false,
  openedProject: undefined,
  projectList: undefined,
  projectCount: 0,
  loading: false,
  error: '',
  filters: {
    difficulty: [],
    state: [],
    supervisor: [],
    skills: [],
    type: [],
    date_end: '',
    date_start: '',
    title: '',
    page: 1,
  },
  filterOptions: {
    allStates: undefined,
    allSupervisors: undefined,
    allSkills: undefined,
    allTypes: undefined,
  },
});
