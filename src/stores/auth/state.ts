import { Candidate } from '@/models/Candidate';
import { Participation } from '@/models/Participation';

export interface State {
  authModalShow: boolean;
  editSkillsModalShow: boolean;
  loading: boolean;
  error: string;
  profileData?: Candidate;
  requestsList?: Participation[];
}

export const state = (): State => ({
  loading: false,
  error: '',
  authModalShow: false,
  editSkillsModalShow: false,
  profileData: undefined,
  requestsList: undefined,
});
