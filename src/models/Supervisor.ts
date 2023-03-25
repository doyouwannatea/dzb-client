import { Institute } from './Institute';
import { CommonUserData } from './User';

export interface Supervisor extends CommonUserData {
  position: string;
  department: Institute | null;
}
