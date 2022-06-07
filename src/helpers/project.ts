import { insituteApi } from '@/api/InsituteApi';
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

export async function projectIncludesCandidateSpeciality(
  candidate: Candidate,
  project: Project,
): Promise<boolean> {
  const matchedSpecialities = await Promise.all(
    project.specialities.map((speciality) =>
      insituteApi.isInSameInstitute(
        speciality.name,
        candidate.group.specialitiy_cource.specialitiy.name,
      ),
    ),
  );

  return matchedSpecialities.filter(Boolean).length > 0;
}
