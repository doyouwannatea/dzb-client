import { Candidate, UserSkills } from '../Candidate';
import { Skill } from '../Project';
import { skills, generalSkills } from './project-skills';

const commonSkills: Skill[] = [
  skills[0],
  skills[1],
  skills[2],
  generalSkills[2],
  generalSkills[4],
];
const personalSkills: Skill[] = [generalSkills[3]];

export const candidate: Candidate = {
  id: 2,
  fio: 'Малыгина Елена',
  about: 'Информация обо мне',
  email: 'example.example@.com',
  phone: '+7 777 777 77 77',
  numz: '11111111',
  course: 3,
  training_group: 'АСУб-19-1',
  skills: [...commonSkills, ...personalSkills],
  is_student: true,
  is_teacher: false,
};

export const userSkills: UserSkills = {
  common: commonSkills,
  personal: personalSkills,
};
