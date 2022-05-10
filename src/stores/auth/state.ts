import { Candidate, UserSkills } from '@/models/Candidate';
import { ParticipationWithProject } from '@/models/Participation';
import { Project } from '@/models/Project';

export interface State {
  loading: boolean;
  error: string;
  profileData?: Candidate;
  participationList?: ParticipationWithProject[];
  projectList?: Project[];
  userSkills?: UserSkills;
}

export const state = (): State => ({
  loading: false,
  error: '',
  profileData: undefined,
  participationList: undefined,
  projectList: undefined,
  userSkills: undefined,
});
