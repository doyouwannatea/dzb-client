import { Project } from '@/models/Project';
import { deepClone } from './array';
import { formatDate } from './string';

export function formatProjectDate(project: Project): Project {
  const formattedProject = deepClone(project);
  formattedProject.date_start = formatDate(new Date(project.date_start));
  formattedProject.date_end = formatDate(new Date(project.date_end));
  return formattedProject;
}
