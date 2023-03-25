import { CommonUserData } from './User';

export interface Candidate extends CommonUserData {
  numz: string;
  phone: string;
  course: number;
  training_group: string;
}
