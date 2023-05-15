import { Candidate } from './Candidate';
import { Supervisor } from './Supervisor';

export interface SharedUserData {
  id: number;
  fio: string;
  email: string;
  about: string;
}

export interface UserRole {
  is_student: boolean;
  is_teacher: boolean;
  is_institute_director: boolean;
}

export type UserRoleKey = keyof UserRole;

export interface UserMetadata extends UserRole {
  canSendParticipations: boolean;
  canReviewProjects: boolean;
}

export interface UserCandidate extends Candidate, Partial<UserMetadata> {}
export interface UserSupervisor extends Supervisor, Partial<UserMetadata> {}
