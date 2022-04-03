import { StateName } from '../Project';

// TODO: Не понятно что такое "Обработка"
export const StateClass: Record<StateName, string> = {
  Открытый: 'new',
  Активный: 'active',
  Обработка: 'null',
  Закрытый: 'closed',
};
