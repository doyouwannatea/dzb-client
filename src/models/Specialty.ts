import { Institute } from './Institute';
import { Tag } from './Tag';

export interface Specialty extends Tag {
  institute?: Institute | null;
  department?: Institute | null;
}
