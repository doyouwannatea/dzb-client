import { UserCandidate, UserSupervisor } from '@/models/User';

export default abstract class ICampusApi {
  abstract auth(): Promise<void>;
  abstract logout(): Promise<void>;
  abstract getUserInfo(): Promise<UserCandidate | UserSupervisor>;
}
