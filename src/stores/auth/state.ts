import { Candidate } from '@/models/Candidate';
import { Participation } from '@/models/Participation';
import { Project } from '@/models/Project';

export interface State {
  loading: boolean;
  error: string;
  profileData?: Candidate;
  requestsList?: Participation[];
  projectsList?: Project[];
}

export const state = (): State => ({
  loading: false,
  error: '',
  profileData: undefined,
  requestsList: undefined,
  projectsList: undefined,
});
