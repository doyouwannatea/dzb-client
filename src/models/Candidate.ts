import { SharedUserData } from './User';

export interface Candidate extends SharedUserData {
  numz: string;
  phone: string;
  course: number;
  training_group: string;
}
