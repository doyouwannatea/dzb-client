import { Supervisor } from '@/models/Supervisor';
import { Skill, ProjectType } from '../models/Project';
import { State } from '../models/ProjectState';

export const SupervisorKeys: Record<keyof Supervisor, keyof Supervisor> = {
  id: 'id',
  fio: 'fio',
  email: 'email',
  position: 'position',
  about: 'about',
  department: 'department',
};
export const TypeKeys: Record<keyof ProjectType, keyof ProjectType> = {
  id: 'id',
  type: 'type',
};
export const SkillKeys: Record<keyof Skill, keyof Skill> = {
  id: 'id',
  name: 'name',
  skillCategory: 'skillCategory',
};
export const StateKeys: Record<keyof State, keyof State> = {
  id: 'id',
  state: 'state',
};
