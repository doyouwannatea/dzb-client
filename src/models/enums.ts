import { Difficulty, StateName } from './Project';

export const DIFFICULTY_TEXT: Record<Difficulty, string> = {
  '1': 'Легко',
  '2': 'Средне',
  '3': 'Сложно',
};

// TODO: Не понятно что такое "Обработка"
export const STATE_CLASS: Record<StateName, string> = {
  Открытый: 'new',
  Активный: 'active',
  Обработка: 'null',
  Закрытый: 'closed',
};
