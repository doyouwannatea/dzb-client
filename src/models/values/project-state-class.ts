import { StateName } from '../Project';

export const StateClass: Record<StateName, string> = {
  активный: 'active',
  добор: 'extra',
  'в архиве': 'archived',
  'идёт набор': 'recruiting',
  // Открытый: 'new',
  // Активный: 'active',
  // Обработка: 'null',
  // Закрытый: 'closed',
};
