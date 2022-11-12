import { UserSkills } from '@/models/Candidate';

export interface State {
  loading: boolean;
  error: string;
  userSkills?: UserSkills;
}

export const state = (): State => ({
  loading: false,
  error: '',
  userSkills: undefined,
});
