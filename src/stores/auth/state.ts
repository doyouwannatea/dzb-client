import { Candidate } from '@/models/Candidate';

export interface State {
  authModalShow: boolean;
  editSkillsModalShow: boolean;
  loading: boolean;
  error: string;
  profileData?: Candidate;
}

export const state = (): State => ({
  authModalShow: false,
  editSkillsModalShow: false,
  profileData: undefined,
  error: '',
  loading: false,
});
