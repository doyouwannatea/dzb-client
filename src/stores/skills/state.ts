import { CandidateSkills } from '@/models/Candidate';

export interface State {
  loading: boolean;
  error: string;
  userSkills?: CandidateSkills;
}

export const state = (): State => ({
  loading: false,
  error: '',
  userSkills: undefined,
});
