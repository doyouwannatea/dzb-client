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
  fio: 'Булгатов Александр',
  about: 'Информация обо мне',
  email: 'alexand.bulgatov13@gmail.com',
  phone: '+7 964 3500 255',
  numz: '19430087',
  course: 3,
  training_group: 'ИСТб-19-1',
  skills: [...commonSkills, ...personalSkills],
  is_student: true,
  is_teacher: false,
};

export const candidateList: Candidate[] = [
  {
    id: 3,
    fio: 'Никульшеев Александр',
    about: 'Информация обо мне',
    email: 'alexand.bulgatov13@gmail.com',
    phone: '+7 964 3500 255',
    numz: '19430087',
    course: 3,
    training_group: 'ИСТб-19-2',
    skills: [...commonSkills, ...personalSkills],
    is_student: true,
    is_teacher: false,
  },
  {
    id: 4,
    fio: 'Вечеслав Колосов',
    about: 'Информация обо мне',
    email: 'alexand.bulgatov13@gmail.com',
    phone: '+7 964 3500 255',
    numz: '19430087',
    course: 3,
    training_group: 'ИСТб-19-2',
    skills: [...commonSkills, ...personalSkills],
    is_student: true,
    is_teacher: false,
  },
  {
    id: 5,
    fio: 'Иван Иванович',
    about: 'Информация обо мне',
    email: 'alexand.bulgatov13@gmail.com',
    phone: '+7 964 3500 255',
    numz: '19430087',
    course: 3,
    training_group: 'ИСТб-19-2',
    skills: [...commonSkills, ...personalSkills],
    is_student: true,
    is_teacher: false,
  },
  {
    id: 6,
    fio: 'Пётр петров',
    about: 'Информация обо мне',
    email: 'alexand.bulgatov13@gmail.com',
    phone: '+7 964 3500 255',
    numz: '19430087',
    course: 3,
    training_group: 'ИСТб-19-2',
    skills: [...commonSkills, ...personalSkills],
    is_student: true,
    is_teacher: false,
  },
  {
    id: 7,
    fio: 'Александр Алексеевич',
    about: 'Информация обо мне',
    email: 'alexand.bulgatov13@gmail.com',
    phone: '+7 964 3500 255',
    numz: '19430087',
    course: 3,
    training_group: 'ИСТб-19-2',
    skills: [...commonSkills, ...personalSkills],
    is_student: true,
    is_teacher: false,
  },
];

export const userSkills: UserSkills = {
  common: commonSkills,
  personal: personalSkills,
};
