import { ParticipationWithProject } from '@/models/Participation';

export interface State {
  loading: boolean;
  error: string;
  participationList?: ParticipationWithProject[];
  participationTime?: string[];
  projectTime?: string[];
}

export const state = (): State => ({
  loading: false,
  error: '',
  participationList: undefined,
  participationTime: undefined,
  projectTime: undefined,
});
