export const enum Difficulty {
  Low = 1,
  Medium = 2,
  High = 3,
}

export const DifficultyText: Record<Difficulty, string> = {
  [Difficulty.Low]: 'Легко',
  [Difficulty.Medium]: 'Средне',
  [Difficulty.High]: 'Сложно',
};
