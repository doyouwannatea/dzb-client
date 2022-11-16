import { Candidate, UserSkills } from '../Candidate';
import { Tag } from '../Project';
import { skills, skillCategories } from './project-skills';

const commonSkills: Tag[] = [
  skills[0],
  skills[1],
  skills[2],
  skillCategories[2],
  skillCategories[4],
];
const personalSkills: Tag[] = [skillCategories[3]];

export const candidate: Candidate = {
  id: 2,
  fio: 'Булгатов Александр',
  about: 'Информация обо мне',
  email: 'alexand.bulgatov13@gmail.com',
  phone: '+7 964 3500 255',
  numz: '19430087',
  course: 3,
  training_group: 'ИСТб-19-1',
  group_id: 1,
  canSendParticipations: false,
  group: {
    id: 1,
    name: 'ИСТб-19-1',
    specialitiyCource_id: 1,
    specialitiy_cource: {
      cource: 1,
      id: 1,
      specialitiy: {
        id: 1,
        name: 'НГДСз',
      },
      specialitiy_id: 1,
    },
  },
  skills: [...commonSkills, ...personalSkills],
  is_student: true,
  is_teacher: false,
};

export const activeProjectId = 1;
export const archiveProjectIdList = [8];

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
    group_id: 1,
    canSendParticipations: true,
    group: {
      id: 1,
      name: 'ИСТб-19-2',
      specialitiyCource_id: 1,
      specialitiy_cource: {
        cource: 1,
        id: 1,
        specialitiy: {
          id: 1,
          name: 'НГДСз',
        },
        specialitiy_id: 1,
      },
    },
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
    group_id: 1,
    canSendParticipations: true,
    group: {
      id: 1,
      name: 'ИСТб-19-2',
      specialitiyCource_id: 1,
      specialitiy_cource: {
        cource: 1,
        id: 1,
        specialitiy: {
          id: 1,
          name: 'НГДСз',
        },
        specialitiy_id: 1,
      },
    },
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
    group_id: 1,
    canSendParticipations: true,
    group: {
      id: 1,
      name: 'ИСТб-19-2',
      specialitiyCource_id: 1,
      specialitiy_cource: {
        cource: 1,
        id: 1,
        specialitiy: {
          id: 1,
          name: 'НГДСз',
        },
        specialitiy_id: 1,
      },
    },
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
    group_id: 1,
    canSendParticipations: true,
    group: {
      id: 1,
      name: 'ИСТб-19-2',
      specialitiyCource_id: 1,
      specialitiy_cource: {
        cource: 1,
        id: 1,
        specialitiy: {
          id: 1,
          name: 'НГДСз',
        },
        specialitiy_id: 1,
      },
    },
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
    training_group: 'ИСТб-19-1',
    group_id: 1,
    canSendParticipations: true,
    group: {
      id: 1,
      name: 'ИСТб-19-1',
      specialitiyCource_id: 1,
      specialitiy_cource: {
        cource: 1,
        id: 1,
        specialitiy: {
          id: 1,
          name: 'НГДСз',
        },
        specialitiy_id: 1,
      },
    },
    skills: [...commonSkills, ...personalSkills],
    is_student: true,
    is_teacher: false,
  },
];

export const userSkills: UserSkills = {
  common: commonSkills,
  personal: personalSkills,
};
