import { State, SupervisorName, Tag, Type } from '../Project';

export const SupervisorNameKeys: Record<
  keyof SupervisorName,
  keyof SupervisorName
> = {
  id: 'id',
  fio: 'fio',
};
export const TypeKeys: Record<keyof Type, keyof Type> = {
  id: 'id',
  type: 'type',
};
export const TagKeys: Record<keyof Tag, keyof Tag> = {
  id: 'id',
  tag: 'tag',
};
export const StateKeys: Record<keyof State, keyof State> = {
  id: 'id',
  state: 'state',
};
