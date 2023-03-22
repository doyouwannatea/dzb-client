import { Institute } from './Institute';
import { Skill } from './Project';
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
  skills: Skill[];
}

export interface CandidateSkills {
  common: Skill[];
  personal: Skill[];
}
