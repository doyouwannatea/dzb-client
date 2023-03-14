import { Candidate } from './Candidate';
import { Supervisor } from './Supervisor';

export interface CommonUserData {
  id: number;
  fio: string;
  email: string;
}

export interface UserMetadata {
  is_student: boolean;
  is_teacher: boolean;
}

export interface UserCandidate extends Candidate, UserMetadata {}
export interface UserSupervisor extends Supervisor, UserMetadata {}
