import { StateName } from '../Project';

export const StateClass: Record<StateName, string> = {
  активный: 'active',
  добор: 'extra',
  'в архиве': 'archived',
  'идёт набор': 'recruiting',
};
