import { Institute } from './Institute';
import { Tag } from './Project';
import { CommonUserData } from './User';

export interface Candidate extends CommonUserData {
  about: string;
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
}

export interface CandidateSkills {
  common: Tag[];
  personal: Tag[];
}
