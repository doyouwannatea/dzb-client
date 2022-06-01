import { Candidate } from '@/models/Candidate';
import { Project } from '@/models/Project';
import { Difficulty } from '@/models/ProjectDifficulty';
import { deepClone } from './array';
import { formatDate } from './string';

export function formatProjectDate(project: Project): Project {
  const formattedProject = deepClone(project);
  formattedProject.date_start = formatDate(new Date(project.date_start));
  formattedProject.date_end = formatDate(new Date(project.date_end));
  return formattedProject;
}

export function checkProjectDifficulty(difficulty: Difficulty): boolean {
  return difficulty && difficulty > 0 && difficulty < 4;
}

export function projectIncludesCandidateSpeciality(
  candidate: Candidate,
  project: Project,
): boolean {
  return project.specialities
    .map((speciality) => speciality.id)
    .includes(candidate.group.specialitiy_cource.specialitiy.id);
}
