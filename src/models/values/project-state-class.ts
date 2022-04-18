import {
  ExtraState,
  ArchivedState,
  ActiveState,
  RecruitingState,
} from '../Project';

export const StateClass: Record<
  | ArchivedState['id']
  | ExtraState['id']
  | ActiveState['id']
  | RecruitingState['id'],
  string
> = {
  1: 'recruiting',
  2: 'active',
  3: 'extra',
  4: 'archived',
};
