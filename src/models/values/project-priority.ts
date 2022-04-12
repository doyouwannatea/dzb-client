import { Priority } from '@/models/Participation';

const enum PriorityType {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export const Priorities: Record<PriorityType, Priority> = {
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

export const PriorityText: Record<Priority, string> = {
  1: 'Высший',
  2: 'Средний',
  3: 'Низкий',
};

export const ALL_PRIORITIES = [
  Priorities.LOW,
  Priorities.MEDIUM,
  Priorities.HIGH,
];
