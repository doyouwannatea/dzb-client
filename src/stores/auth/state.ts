import { UserCandidate, UserSupervisor } from '@/models/User';

export interface State {
  profileData?: UserCandidate | UserSupervisor;
}

export const state = (): State => ({
  profileData: undefined,
});
