import { Institute } from './Institute';
import { SharedUserData } from './User';

export interface Supervisor extends SharedUserData {
  position: string;
  department: Institute | null;
}
