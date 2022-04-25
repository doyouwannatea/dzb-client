import { Supervisor, Skill, Type } from '../models/Project';
import { State } from '../models/ProjectState';

export const SupervisorKeys: Record<keyof Supervisor, keyof Supervisor> = {
  id: 'id',
  fio: 'fio',
  api_token: 'api_token',
  created_at: 'created_at',
  email: 'email',
  position: 'position',
  updated_at: 'updated_at',
};
export const TypeKeys: Record<keyof Type, keyof Type> = {
  id: 'id',
  type: 'type',
  created_at: 'created_at',
  updated_at: 'updated_at',
};
export const SkillKeys: Record<keyof Skill, keyof Skill> = {
  id: 'id',
  created_at: 'created_at',
  pivot: 'pivot',
  skill: 'skill',
  updated_at: 'updated_at',
};
export const StateKeys: Record<keyof State, keyof State> = {
  id: 'id',
  state: 'state',
};
