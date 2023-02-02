import { ParticipationWithProject } from '@/models/Participation';

export interface State {
  loading: boolean;
  error: string;
  participationList?: ParticipationWithProject[];
  participationDeadlineDate?: string;
}

export const state = (): State => ({
  loading: false,
  error: '',
  participationList: undefined,
  participationDeadlineDate: undefined,
});
