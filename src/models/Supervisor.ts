import { Department } from './Department';
import { SharedUserData } from './User';

export interface Supervisor extends SharedUserData {
  position: string;
  department: Department;
}
