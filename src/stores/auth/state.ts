import { UserCandidate, UserSupervisor } from '@/models/User';

export interface State {
  loading: boolean;
  error: string;
  profileData?: UserCandidate | UserSupervisor;
}

export const state = (): State => ({
  loading: false,
  error: '',
  profileData: undefined,
});
