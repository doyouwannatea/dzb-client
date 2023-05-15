import { Institute } from './Institute';
import { Tag } from './Tag';

export type Department = Tag & { institute: Institute };
