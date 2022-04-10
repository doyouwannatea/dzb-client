import { Difficulty } from '../Project';

const enum DifficultyType {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export const Difficulties: Record<DifficultyType, Difficulty> = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
};

export const DifficultyText: Record<Difficulty, string> = {
  1: 'Легко',
  2: 'Средне',
  3: 'Сложно',
};
