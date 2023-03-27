import { Skill } from '../Project';
import { Tag } from '../Tag';

const skillCategory: Tag = {
  id: 1,
  name: 'Навыки',
};

export const skills: Skill[] = [
  {
    id: 1,
    name: 'Web',
    skillCategory,
  },
  {
    id: 2,
    name: 'Mobile',
    skillCategory,
  },
  {
    id: 3,
    name: 'Конференция',
    skillCategory,
  },
  {
    id: 4,
    name: 'Обучение',
    skillCategory,
  },
  {
    id: 5,
    name: 'Коммерческий',
    skillCategory,
  },
  {
    id: 6,
    name: 'Долгосрочный',
    skillCategory,
  },
  {
    id: 7,
    name: 'Неординарный',
    skillCategory,
  },
];
