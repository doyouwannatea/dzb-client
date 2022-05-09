import { Supervisor } from '@/models/Supervisor';
import { Skill, Type } from '../models/Project';
import { State } from '../models/ProjectState';

export const SupervisorKeys: Record<keyof Supervisor, keyof Supervisor> = {
  id: 'id',
  fio: 'fio',
  email: 'email',
  position: 'position',
};
export const TypeKeys: Record<keyof Type, keyof Type> = {
  id: 'id',
  type: 'type',
};
export const SkillKeys: Record<keyof Skill, keyof Skill> = {
  id: 'id',
  skill: 'skill',
  skillCategory_id: 'skillCategory_id',
};
export const StateKeys: Record<keyof State, keyof State> = {
  id: 'id',
  state: 'state',
};
