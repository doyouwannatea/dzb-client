import { Skill } from './Project';

export interface Student {
  id: number;
  fio: string;
  about: string;
  email: string;
  phone: string;
  numz: string;
  course: number;
  training_group: string;
  skills: Skill[];
  experience: number[];
}

export interface StudentUpdate {
  about: string;
  phone: string;
  skills: Skill[];
}
