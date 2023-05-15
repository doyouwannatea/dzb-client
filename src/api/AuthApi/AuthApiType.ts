import { UserCandidate, UserSupervisor } from '@/models/User';

export default interface AuthApiType {
  auth(): Promise<void>;
  logout(): Promise<void>;
  getUserInfo(): Promise<UserCandidate | UserSupervisor | undefined>;
  getCandidateInfo(): Promise<UserCandidate>;
  getSupervisorInfo(): Promise<UserSupervisor>;
}
