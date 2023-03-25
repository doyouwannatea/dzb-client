export const enum ProjectDifficulty {
  Low = 1,
  Medium = 2,
  High = 3,
}

export const DifficultyText: Record<ProjectDifficulty, string> = {
  [ProjectDifficulty.Low]: 'Легко',
  [ProjectDifficulty.Medium]: 'Средне',
  [ProjectDifficulty.High]: 'Сложно',
};
