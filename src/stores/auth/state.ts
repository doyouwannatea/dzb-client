import { Candidate, UserSkills } from '@/models/Candidate';
import { Participation } from '@/models/Participation';
import { Project } from '@/models/Project';

export interface State {
  loading: boolean;
  error: string;
  profileData?: Candidate;
  requestsList?: Participation[];
  projectsList?: Project[];
  userSkills?: UserSkills;
}

export const state = (): State => ({
  loading: false,
  error: '',
  profileData: undefined,
  requestsList: undefined,
  projectsList: undefined,
  userSkills: undefined,
});
