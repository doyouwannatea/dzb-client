import { Institute } from './Institute';
import { Tag } from './Project';

export interface Candidate {
  id: number;
  fio: string;
  about: string;
  email: string;
  numz: string;
  phone: string;
  course: number;
  training_group: string;
  canSendParticipations: boolean;
  group: {
    id: number;
    name: string;
    specialitiyCource_id: number;
    specialitiy_cource: {
      id: number;
      cource: number;
      specialitiy: Institute;
      specialitiy_id: number;
    };
  };
  group_id: number;
  skills: Tag[];
  is_student: boolean;
  is_teacher: boolean;
}

export interface UserSkills {
  common: Tag[];
  personal: Tag[];
}
