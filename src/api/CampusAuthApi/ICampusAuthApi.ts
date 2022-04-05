import { getCookie, setCookie } from '@/helpers/cookie';
import { Candidate } from '@/models/Candidate';
import { Participation } from '@/models/Participation';

export default abstract class ICampusAuthApi {
  public getAuthToken = () => getCookie('token');
  public setAuthToken = (token: string) => setCookie('token', token);
  abstract auth(): Promise<void>;
  abstract getCandidateInfo(): Promise<Candidate>;
  abstract getCandidateParticipationsList(): Promise<Participation[]>;
}
