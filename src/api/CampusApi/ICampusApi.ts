import { UserCandidate, UserSupervisor } from '@/models/User';

export default abstract class ICampusApi {
  abstract auth(): Promise<void>;
  abstract logout(): Promise<void>;
  abstract getUserInfo(): Promise<UserCandidate | UserSupervisor | undefined>;
  abstract getCandidateInfo(): Promise<UserCandidate>;
  abstract getSupervisorInfo(): Promise<UserSupervisor>;
}
