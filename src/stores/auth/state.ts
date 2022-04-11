import { Candidate } from '@/models/Candidate';
import { Participation } from '@/models/Participation';

export interface State {
  loading: boolean;
  error: string;
  profileData?: Candidate;
  requestsList?: Participation[];
}

export const state = (): State => ({
  loading: false,
  error: '',
  profileData: undefined,
  requestsList: undefined,
});
