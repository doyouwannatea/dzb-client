import { Skill } from './Project';

export interface Candidate {
  id: number;
  fio: string;
  about: string;
  email: string;
  numz: string;
  phone: string;
  course: number;
  training_group: string;
  api_token: string;
  skills: Skill[];
  is_student: boolean;
  is_teacher: boolean;
}
