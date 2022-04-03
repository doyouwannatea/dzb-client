import { AuthToken } from '@/models/CampusAuth';
import { Candidate } from '@/models/Candidate';
import { Participation } from '@/models/Participation';

export default abstract class ICampusAuthApi {
  protected token = '';
  getToken = () => this.token;
  setToken = (token: string) => (this.token = token);
  abstract auth(): Promise<AuthToken>;
  abstract getCandidateInfo(): Promise<Candidate>;
  abstract getCandidateParticipationsList(): Promise<Participation[]>;
}
